const clone = require('git-clone');
const path = require('path');

const constants = require('./constants');
const repoModule = require(constants.SRC_PATH + '/repository.js');

function main() {
    // checkout('client');
    checkout('client');
}

function checkout(type) {
    const filepath = constants.DATA_PROJECT_PATH + 'test.txt';
    const files_url = repoModule.getRepos(filepath);
    const directory = constants.DATA_PROJECT_PATH + 'repo3/' + type;

    // Add SHA-commit to clone specific repository version
    const checkout = '';
    const options = null;
    console.log(directory);

    let repoName;
    for (let file_url of files_url) {
        repoName = file_url.substring(file_url.lastIndexOf('/'));

        clone(file_url, path.join(directory, repoName), options, (err) => {
            if (err) {
                console.log('error: ', err)
            } else {
                console.log('Checkout: ', file_url);
            }
        });
    }
}

main();