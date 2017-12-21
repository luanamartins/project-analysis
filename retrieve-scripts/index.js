require('dotenv').config();

const path = require('path');
const async = require('async');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics.js');
const filesModule = require('./files.js');
const utils = require('./utils.js');

const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
console.log(projectPath);

const inputGithubFilepath = path.join(projectPath, 'github.txt');
const outputGithubFilepath = path.join(projectPath, 'repos');


function main() {

    const reposToCheckout = repoModule.getRepos(inputGithubFilepath);
    const repositoriesName = checkoutRepos(reposToCheckout, true);
    const start = new Date();
    const hrstart = process.hrtime();

    async.each(repositoriesName, shouldRunParallel, function (err) {
        console.log(err);
    });

    console.log('Finished');
    const end = new Date() - start, hrend = process.hrtime(hrstart);

    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
}

function shouldRunParallel(repositoryName) {
    async.waterfall(
        [
            async.apply(getFilesOfRepository, repositoryName),
            extractMetricsFromFiles
        ]
    );
}

function getFilesOfRepository(repositoryName, callback) {
    const files = getFilesFromDirectory(repositoryName);
    callback(null, repositoryName, files);
}

function extractMetricsFromFiles(repositoryName, files, callback) {
    const metrics = metricsModule.handleMetrics(files, projectPath);

    const repoObject = utils.createRepoObject(projectPath);
    const headers = utils.listPropertiesOf(repoObject);
    filesModule.writeCsvFile('./statistics/data/' + repositoryName + '.csv', headers, metrics);

    callback(null);
}

// function writeMetricsToFile(repositoryName, metrics, callback) {
//     const repoObject = utils.createRepoObject(projectPath);
//     const fields = utils.listPropertiesOf(repoObject);
//     filesModule.writeCsvFile('./statistics/data/' + repositoryName + '.csv', fields, metrics);
//     callback(null);
// }

// function getDataFromMetrics(repositoryName, metricsPerScript, fields, callback) {
//     callback(null, repositoryName, fields, metricsPerScript);
//
// }
//
// function writeMetricsOnFile(repositoryName, fields, data, callback) {
//     filesModule.writeCsvFile('./statistics/data/' + repositoryName + '.csv', fields, data);
//     callback(null);
// }


function checkoutRepos(reposToCheckout, checkoutEverything) {
    let repositoriesName = [];
    if (checkoutEverything) {
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, outputGithubFilepath);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName.replace("/", ""));
        });
    } else {
        repositoriesName = ['teste'];
    }
    return repositoriesName;
}

function getFilesFromDirectory(repositoryName) {
    const repoOutputDirectory = path.join(outputGithubFilepath, repositoryName);
    // const repoOutputDirectory = path.join(projectPath, 'test-parallel');
    const filenames = repoModule.getFilesFromDir(repoOutputDirectory, ['.js'], ['.min.js']);

    let files = [];
    filenames.forEach(file => {
        if (!file.includes('node_modules')) {
            files.push(path.join(repoOutputDirectory, file));
        }
    });
    return files;
}


function test() {
    const test_path = path.join(projectPath, 'test.js')
    const files = [test_path,test_path,test_path,test_path,test_path,test_path,test_path,test_path,test_path];
    //const files = [test_path];
    const metrics = metricsModule.handleMetrics(files, projectPath);
    // console.log(metrics);
}

main();