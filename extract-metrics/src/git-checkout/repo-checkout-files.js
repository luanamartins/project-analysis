const clone = require('git-clone');
const clone_promise = require('git-clone-promise');
const gitlog = require('gitlog');
const path = require('path');
const fs = require('fs');

const constants = require('../constants');
const repoModule = require(constants.SRC_PATH + '/repository.js');

function main() {
    // checkout('client');
    // checkout('server');

    checkout('test');
}

function checkout(type) {
    const filepath = constants.DATA_PROJECT_PATH + type + '.txt';
    const files_url = repoModule.getRepos(filepath);
    const root_directory = constants.DATA_PROJECT_PATH + 'repo3/' + type;

    console.log(root_directory);

    const promises = files_url.map((file_url) => {
        return new Promise((resolve, reject) => {
            const repo_name = file_url.substring(file_url.lastIndexOf('/'));
            const directory = path.join(root_directory, repo_name);
            clone_promise(file_url, directory, null)
                .then(() => {
                    const options = {
                        repo: directory,
                        number: 1,
                        until: '2017-1-1'
                    };
                    let commits = gitlog(options);
                    let first_commit = commits[0];
                    data = {
                        'repo_url': file_url,
                        'hash': first_commit.hash
                    };

                    resolve(data);
                })
                .catch(console.log)
            })
        });

    Promise.all(promises).then((data) => {
        fs.writeFileSync(constants.SRC_GIT_CHECKOUT_PATH + 'repo-hash.json', JSON.stringify(data), 'utf8');
    }).catch(console.log);
}

main();