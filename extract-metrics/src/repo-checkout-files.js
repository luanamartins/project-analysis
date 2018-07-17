const CONFIG = require("../config");

const repoModule = require(CONFIG['srcPath'] + '/repository.js');
const clone = require('git-clone');
const path = require('path');

function main() {
    // checkout('client');
    checkout('server');
}

function checkout(type) {
    const filepath = CONFIG['dataProjectPath'] + type + '.txt';
    const reposUrl = repoModule.getRepos(filepath);
    const directory = CONFIG['dataProjectPath'] + 'repo2/' + type;

    console.log(directory);

    let repoName;
    reposUrl.forEach(function (repo) {
        repoName = repo.substring(repo.lastIndexOf('/'));

        clone(repo, path.join(directory, repoName), null, (err) => {
            if (err) {
                console.log('error: ', err)
            } else {
                console.log('Checkout: ', repo);
            }
        });
    });
}

main();