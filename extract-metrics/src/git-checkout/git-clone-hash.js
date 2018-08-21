const path = require('path');
const clone_promise = require('git-clone-promise');

const constants = require('../constants');
const type = 'client';

function main() {
    checkout('client');
    checkout('server');

    // checkout('test');
}

function checkout(type) {
    const root_directory = constants.DATA_PROJECT_PATH + 'repo-2017/' + type;
    const json_file =  type + '-repo-hash.json';
    const collection = require('./' + json_file);

    for (let data_object of collection) {
        const repo_url = data_object.repo_url;
        const repo_name = repo_url.substring(repo_url.lastIndexOf('/'));
        const directory = path.join(root_directory, repo_name);
        const options = {checkout: data_object.hash};

        clone_promise(repo_url, directory, options, null)
            .then(() => {
                console.log(repo_url);
            })
            .catch(console.log);
    }
}

main();