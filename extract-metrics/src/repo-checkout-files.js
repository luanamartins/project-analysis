const CONFIG = require("../config");

const repoModule = require(CONFIG['srcPath'] + '/repository.js');
const clone = require('git-clone');
const path = require('path');

function main() {
    checkout('client');
    checkout('server');
}

function checkout(type) {
    const filepath = CONFIG['dataProjectPath'] + type + '.txt';
    const reposUrl = repoModule.getRepos(filepath);
    const directory = CONFIG['dataProjectPath'] + 'repo/' + type;

    let repoName;
    let filedir;
    reposUrl.forEach(function (repo) {
        repoName = repo.substring(repo.lastIndexOf('/'));
        filedir = path.join(directory, repoName);
        clone(repo, filedir, null, () => { console.log('Checkout: ', filedir) });
    });
}

main();