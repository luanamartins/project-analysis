const repoModule = require('./repository.js');
const clone = require('git-clone');
const path = require('path');

function main() {
    checkout('client');
    checkout('server');
}

function checkout(type) {
    const filepath = path.join(__dirname, '..', 'data', type +'.txt');
    const reposUrl = repoModule.getRepos(filepath);
    let directory = path.join(__dirname, 'data', 'repo', type);

    reposUrl.forEach(function (repo) {
        const repoName = repo.substring(repo.lastIndexOf('/'));
        const filedir = path.join(directory, repoName);
        clone(repo, filedir, null, () => { console.log('Checkout: ', filedir) });
    });
}

main();