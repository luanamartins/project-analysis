const repoModule = require('./repository.js');
const clone = require('git-clone');
const path = require('path');

function main() {
    checkout('client');
    checkout('server');
}

function checkout(type) {
    const filepath = path.join(__dirname, 'data/' + type +'.txt');
    const reposUrl = repoModule.getRepos(filepath);
    const targetDirectory = path.join(__dirname, 'data/repo' + type);
    checkoutRepos(reposUrl, targetDirectory);
}

function checkoutRepos(reposToCheckout, directory) {
    reposToCheckout.forEach(function (repo) {
        const repoName = repo.substring(repo.lastIndexOf("/"));
        const targetDirectory = path.join(directory, repoName);
        clone(repo, targetDirectory, null, () => { console.log('Checkout: ', repoName) });
    });
}

main();