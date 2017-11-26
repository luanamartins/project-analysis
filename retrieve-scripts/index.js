require('dotenv').config();

const path = require('path');
const fs = require('fs');
const async = require('async');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics.js');
const filesModule = require('./files.js');
const utils = require('./utils.js');

const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
console.log(projectPath);

let inputGithubFilepath = path.join(projectPath, 'github.txt');
const outputGithubFilepath = path.join(projectPath, 'repos');


function main() {

    let reposToCheckout = repoModule.getRepos(inputGithubFilepath);
    let repositoriesName = checkoutRepos(reposToCheckout, false);
    console.time('time');

    async.each(repositoriesName, shouldRunParallel, function (err) {
        console.log(err);
    });

    console.log('Finished');
    console.timeEnd('time');
}

function shouldRunParallel(repositoryName) {
    async.waterfall(
        [
            async.apply(firstFunction, repositoryName),
            secondFunction,
            thirdFunction,
            forthFunction,
            fifthFunction
        ]
    );
}

function firstFunction(repositoryName, callback) {
    const files = getFilesFromDirectory(repositoryName);
    callback(null, repositoryName, files);
}

function secondFunction(repositoryName, files, callback) {
    const metrics = metricsModule.handleMetrics(files, projectPath);
    callback(null, repositoryName, metrics);
}

function thirdFunction(repositoryName, metrics, callback) {
    const repoObject = utils.createRepoObject(projectPath);
    const fields = utils.listPropertiesOf(repoObject);
    callback(null, repositoryName, metrics, fields);
}

function forthFunction(repositoryName, metricsPerScript, fields, callback) {

    const data = metricsPerScript.map(repoObject => {
        let metrics = {
            numberOfLogicalLines: repoObject.numberOfLogicalLines,
            numberOfPhysicalLines: repoObject.numberOfPhysicalLines
        };
        Object.assign(metrics, repoObject.tryCatch, repoObject.promise, repoObject.asyncAwait, repoObject.events, repoObject.callbacks);

        return metrics;
    });

    callback(null, repositoryName, fields, data);

}

function fifthFunction(repositoryName, fields, data, callback) {
    filesModule.writeCsvFile('./statistics/data/' + repositoryName + '.csv', fields, data);
    callback(null);
}


function checkoutRepos(reposToCheckout, checkoutEverything) {
    let repositoriesName = [];
    if (checkoutEverything) {
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, outputGithubFilepath);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName.replace("/", ""));
        });
    } else {
        repositoriesName = ['socket.io', 'hexo'];
    }
    return repositoriesName;
}

function getFilesFromDirectory(repositoryName) {
    let repoOutputDirectory = path.join(outputGithubFilepath, repositoryName);
    let filenames = repoModule.getFilesFromDir(repoOutputDirectory, ['.js'], ['.min.js']);

    let files = [];
    filenames.forEach(file => {
        if (!file.includes('node_modules')) {
            files.push(path.join(repoOutputDirectory, file));
        }
    });
    return files;
}


function test() {
    const files = [path.join(projectPath, 'test.js')];
    const metrics = metricsModule.handleMetrics(files, projectPath);
    console.log(metrics);
}

main();