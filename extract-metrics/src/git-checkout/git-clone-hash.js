const path = require('path');
const clone_promise = require('git-clone-promise');

const constants = require('../constants');

const type = 'client';
const root_directory = constants.DATA_PROJECT_PATH + 'repo4/' + type;

const collection = require('./repo-hash.json');

for (let data_object of collection) {
    const repo_url = data_object.repo_url;
    const repo_name = repo_url.substring(repo_url.lastIndexOf('/'));
    const directory = path.join(root_directory, repo_name);

    clone_promise(repo_url, directory, { checkout: data_object.hash })
        .then(() => {
            console.log(repo_url);
        })
        .catch(console.log);
}
