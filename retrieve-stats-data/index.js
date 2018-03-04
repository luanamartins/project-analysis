require('dotenv').config()
const request = require('request')
const filesModule = require('./files')
const fs = require('fs')
const utils = require('./utils.js');

// var url = '/search/issues?q=repo:nodejs/node+type:issue+state:closed'
// var urlC = '/repos/nodejs/node'


function getAllRepositories(filepath) {
    const projectPath = process.env.PROJECT_PATH
    const path = projectPath + '/' + filepath
    var repositories = fs.readFileSync(path).toString().split('\n')
    repositories = repositories.map((repository) => repository.replace('https://github.com/', ''))
    console.log('Got repositories')
    return repositories
}

function getRepoDataRequest(repository) {
    const url = 'http://api.github.com/repos/' + repository
    return getRequest(url)
}

function getClosedIssuesRequest(repository) {
    const url = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:issues+state:closed'
    return getRequest(url)
}

function getOpenPullRequests(repository) {
    const url = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:open'
    return getRequest(url)
}

function getClosedPullRequests(repository) {
    const url = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:closed'
    return getRequest(url)
}

function getRequest(githubApiUrl) {
    var options = {
        url: githubApiUrl,
        headers: {
            'user-agent': 'node.js',
            'Authorization': 'token ' + process.env.GITHUB_TOKEN
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}

function getGithubData(repo) {
    let promises = [
        getRepoDataRequest(repo),
        getClosedIssuesRequest(repo),
        getOpenPullRequests(repo),
        getClosedPullRequests(repo)
    ]

    return Promise.all(promises).then((responses) => {
        var generalResponse = JSON.parse(responses[0])
        var closedIssuesResponse = JSON.parse(responses[1])
        var openPullResponse = JSON.parse(responses[2])
        var closedPullResponse = JSON.parse(responses[3])

        return new Promise(function (resolve, reject) {
            try {
                resolve({
                    repo_name: repo,
                    forks: generalResponse.forks,
                    stars: generalResponse.stargazers_count,
                    watchers: generalResponse.subscribers_count,
                    open_issues: generalResponse.open_issues_count - openPullResponse.total_count,
                    closed_issues: closedIssuesResponse.total_count,
                    open_pull_requests: openPullResponse.total_count,
                    closed_pull_requests: closedPullResponse.total_count
                })
            } catch (error) {
                reject(error)
            }
        })
    })
}


function getData() {

}

const projectPath = process.env.PROJECT_PATH

const repositories = getAllRepositories('data/teste.txt')
console.log(repositories)

repositories.forEach(function(repo) {
    getGithubData(repo)
        .then(function(data){
            // console.log(data)
            const headers = utils.listPropertiesOf(data)
            console.log('rr ', headers)

        })
        .catch(function(err){
            console.log('Error on: ', repo)
            console.log(err)
        })
})


const filename = 'retrieve-stats-data/results.csv'
filesModule.writeCsvFile(filename, headers, data)


// getGithubData('nodejs/node').then(console.log)

// var actions = repositories.map(function (repo) {
//     getGithubData(repo)
// })
//
// Promise.all(actions).then(function (results) {
//     console.log(results)
// })

// const repositories = getAllRepositories('data/teste.txt').map((repo) => getGithubData(repo))
// Promise.all(repositories).then((data) => {
//     // const filepath = projectPath + '/data/client.csv'
//     // filesModule.writeCsvFile(filepath, null, data)
//     console.log('Data: ', data)
// }).catch(console.log)




