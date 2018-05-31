const request = require('request');
const fs = require('fs');
const filesModule = require('./files');

//const filepath = '/Users/luizvasconcelos/Desktop/Luana/project-analysis/extract-metrics/data/client.txt';
const filepath = '/Users/luizvasconcelos/Desktop/Luana/project-analysis/retrieve-stats-data/teste.txt';
const csvFilename = '/Users/luizvasconcelos/Desktop/Luana/project-analysis/statistics/result/github-data.csv';
const token = 'fd7df266860188e5b4c5bd79c0883fb590753f7c';

function getRequest(url) {
    const options = {
        url: url,
        headers: {
            'user-agent': 'node.js',
            'Authorization': 'token ' + token
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body, headers) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        })
    })
}

async function run(repository) {
    try {
        const repoUrl = 'http://api.github.com/repos/' + repository;
        const contributorsUrl = 'http://api.github.com/repos/' + repository + '/contributors';
        const closedIssuesUrl = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:issues+state:closed';
        const openIssuesUrl = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:open';
        const closedPullRequestsUrl = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:closed';
        const openPullRequestsUrl = 'http://api.github.com/search/issues?q=repo:' + repository + '+type:pr+state:open';
        
        const data1 = await getRequest(repoUrl);
        const jsonData = JSON.parse(data1);
        const forks = jsonData.forks_count;
        const stars = jsonData.stargazers_count;
        const watchers = jsonData.subscribers_count;

        const data2 = await getRequest(openPullRequestsUrl);
        const jsonData2 = JSON.parse(data2);
        const open_issues = jsonData.open_issues_count - jsonData2.total_count;

        const data3 = await getRequest(closedIssuesUrl);
        const closed_issues = JSON.parse(data3).total_count;

        const data4 = await getRequest(openPullRequestsUrl);
        const open_pull_requests = JSON.parse(data4).total_count;

        const data5 = await getRequest(closedPullRequestsUrl);
        const closed_pull_requests = JSON.parse(data5).total_count;

        const data6 = await getRequest(contributorsUrl);
        const contributors = JSON.parse(data6).length;

        const result = {
            repo_name: repository,
            forks, 
            stars, 
            watchers, 
            open_issues, 
            closed_issues, 
            open_pull_requests, 
            closed_pull_requests, 
            contributors
        };

        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
    }
}

function getAllRepositories(filepath) {

    let repositories = fs.readFileSync(filepath).toString().split('\n');
    repositories = repositories.map((repository) => repository.replace('https://github.com/', ''));
    console.log('Got repositories');
    return repositories;
}

function createPromise(repository) {
    return new Promise(function(res, rej){
        return run(repository);
    });
}
 
async function main() {
    const repositories = getAllRepositories(filepath);

    const data = [];
    for(let repo of repositories) {
        const result = await run(repo);
        data.push(result);
    }

    writeFile(data);
    console.log('done');
}

function writeFile(data) {
    const headers = [
        'repo_name', 'forks', 'stars', 'watchers', 'open_issues',
        'closed_issues', 'open_pull_requests', 'closed_pull_requests', 'contributors'
    ];

    filesModule.writeCsvFile(csvFilename, headers, data);
}

main();
