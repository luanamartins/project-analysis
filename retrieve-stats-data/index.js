require('dotenv').config();
const request = require('request');
const filesModule = require('./files');
const fs = require('fs');
const utils = require('./utils.js');

function getAllRepositories(filepath) {
    const projectPath = process.env.PROJECT_PATH;
    const path = projectPath + '/' + filepath;
    let repositories = fs.readFileSync(path).toString().split('\n');
    repositories = repositories.map((repository) => repository.replace('https://github.com/', ''));
    console.log('Got repositories');
    return repositories
}

function getRepoDataRequest(repository) {
    const url = 'http://api.github.com/repos/' + repository;
    return getRequest(url)
}

function getClosedIssuesRequest(repository) {
    const url = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:issues+state:closed';
    return getRequest(url)
}

function getOpenPullRequests(repository) {
    const url = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:open';
    return getRequest(url)
}

function getClosedPullRequests(repository) {
    const url = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:closed';
    return getRequest(url)
}

function getRequest(githubApiUrl) {
    const options = {
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
    ];

    return Promise.all(promises).then((responses) => {
        var generalResponse = JSON.parse(responses[0]);
        var closedIssuesResponse = JSON.parse(responses[1]);
        var openPullResponse = JSON.parse(responses[2]);
        var closedPullResponse = JSON.parse(responses[3]);

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

function deleteFromArray(array, deleteValue) {
    const result = [];
    array.forEach(function (item) {
        if (item != deleteValue) {
            result.push(item)
        }
    });

    return result
}


const projectPath = process.env.PROJECT_PATH;

const repositories = getAllRepositories('data/teste.txt');
console.log(repositories);

let prom = [];
repositories.forEach(function (repo) {
    prom.push(new Promise(function (resolve, reject) {
        getGithubData(repo)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (err) {
                resolve({});
                console.log('https://github.com/' + repo)
            })
    }))
});

Promise.all(prom)
    .then(function (values) {
        //console.log('values ', values)
        const filename = 'retrieve-stats-data/results.csv';
        const headers = ['repo_name', 'forks', 'stars', 'watchers', 'open_issues',
            'closed_issues', 'open_pull_requests', 'closed_pull_requests'];

        filesModule.writeCsvFile(filename, headers, deleteFromArray(values, {}))
    })
    .catch(console.log);




