'use strict';

// require('dotenv').config();

const path = require('path');
const async = require('async');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics/metrics.js');
const filesModule = require('./files.js');
const utils = require('./utils.js');

const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
console.log(projectPath);

const repoDir = '/data/repo';
const clientDirectory = path.join(repoDir, 'client');
const serverDirectory = path.join(repoDir, 'server');

const failedClientFilepath = '/data/failed-files-client.txt';
const failedServerFilepath = '/data/failed-files-server.txt';

const clientRepoFilepath = '/data/client.txt';
const serverRepoFilepath = '/data/server.txt';

const resultClientDirectory = '/data/client/';
const resultServerDirectory = '/data/server/';

// TODO
// Quais os arquivos que não conseguimos processar?
// Qual o número de arquivos por projeto? E no total?

function main() {
    const start = new Date();
    const hrstart = process.hrtime();
    
    const clientOptions = {
    	repoDirectory: clientDirectory,
		repoFilepath: clientRepoFilepath,
		resultDirectory: resultClientDirectory,
		failedFilepath: failedClientFilepath
    };

    processRepos(clientOptions);
    
	 const serverOptions = {
    	repoDirectory: serverDirectory,
		repoFilepath: serverRepoFilepath,
		resultDirectory: resultServerDirectory,
		failedFilepath: failedServerFilepath
    };
    
    processRepos(serverOptions);

    console.log('Finished');
    const end = new Date() - start, hrend = process.hrtime(hrstart);

    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
}


function processRepos(options) {

    const reposToCheckout = repoModule.getRepos(options.repoFilepath);
    const repositoriesName = checkoutRepos(reposToCheckout, true);

    async.each(repositoriesName,
        function (repositoryName) {
            shouldRunParallel(repositoryName, options.repoFilepath, options.failedFilepath)
        }, function (err) {
        console.log(err);
    });
}

function shouldRunParallel(repositoryName, dataFilepath, failedFilepath) {
    async.waterfall(
        [
            async.apply(getFilesOfRepository, repositoryName, dataFilepath, failedFilepath),
            extractMetricsFromFiles
        ]
    );
}

function getFilesOfRepository(repositoryName, dataFilepath, failedFilepath, callback) {
    const files = getFilesFromDirectory(repositoryName);
    callback(null, repositoryName, files, dataFilepath, failedFilepath);
}

function extractMetricsFromFiles(repositoryName, files, dataFilepath, failedFilepath, callback) {
    const metricsData = metricsModule.handleMetrics(files, projectPath);

    const repoObject = utils.createRepoObject(projectPath);
    const headers = utils.listPropertiesOf(repoObject);

    filesModule.writeCsvFile(dataFilepath + repositoryName + '.csv', headers, metricsData.metrics);

    if(metricsData.failedFiles) {
        const failedFilesData = metricsData.failedFiles.join('\n');
        filesModule.appendDataToFile(failedFilepath, failedFilesData);
    }

    callback(null);
}

function checkoutRepos(reposToCheckout, checkoutEverything) {
    let repositoriesName = [];
    if (checkoutEverything) {
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, repositoriesDirectory);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName.replace("/", ""));
        });
    } else {
        repositoriesName = ['teste'];
    }
    return repositoriesName;
}

function getFilesFromDirectory(repositoryName) {
    const repoOutputDirectory = path.join(repositoriesDirectory, repositoryName);
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
    const test_path = path.join(projectPath, 'test.js');
    // const files = [test_path,test_path,test_path,test_path,test_path,test_path,test_path,test_path,test_path];
    const files = [test_path];
    const metrics = metricsModule.handleMetrics(files, projectPath);
    console.log(metrics);
}

main();