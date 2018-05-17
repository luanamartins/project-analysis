'use strict';

// require('dotenv').config();

const path = require('path');
const async = require('async');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics/metrics.js');
const filesModule = require('./files.js');
const utils = require('./utils.js');

const projectPath = '../extract-metrics/src/';
console.log(projectPath);

const clientDirectory = projectPath + 'data/repo/client/';
const serverDirectory = projectPath + 'data/repo/server/';

const failedClientFilepath = projectPath + 'data/failed-files-client.txt';
const failedServerFilepath = projectPath + 'data/failed-files-server.txt';

const clientRepoFilepath = projectPath + 'data/client.txt';
const serverRepoFilepath = projectPath + 'data/server.txt';

const resultClientDirectory = projectPath + 'data/result/client/';
const resultServerDirectory = projectPath + 'data/result/server/';

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
    const repositoriesName = checkoutRepos(reposToCheckout, true, options);

    async.each(repositoriesName,
        function (repositoryName) {
            shouldRunParallel(repositoryName, options)
        }, function (err) {
        console.log(err);
    });
}

function shouldRunParallel(repositoryName, options) {
    async.waterfall(
        [
            async.apply(getFilesOfRepository, repositoryName, options),
            extractMetricsFromFiles
        ]
    );
}

function getFilesOfRepository(repositoryName, options, callback) {
    const files = getFilesFromDirectory(repositoryName, options.repoDirectory);
    callback(null, repositoryName, options, files);
}

function extractMetricsFromFiles(repositoryName, options, files, callback) {
    const metricsData = metricsModule.handleMetrics(files, projectPath);

    const repoObject = utils.createRepoObject(projectPath);
    const headers = utils.listPropertiesOf(repoObject);

    filesModule.writeCsvFile(options.resultDirectory + repositoryName + '.csv', headers, metricsData.metrics);

    if(metricsData.failedFiles) {
        const failedFilesData = metricsData.failedFiles.join('\n');
        filesModule.appendDataToFile(options.failedFilepath, failedFilesData);
    }

    callback(null);
}

function checkoutRepos(reposToCheckout, checkoutEverything, options) {
    let repositoriesName = [];
    if (checkoutEverything) {
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, options.repoDirectory);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName.replace("/", ""));
        });
    } else {
        repositoriesName = ['teste'];
    }
    return repositoriesName;
}

function getFilesFromDirectory(repositoryName, repositoriesDirectory) {
    const repoOutputDirectory = path.join(repositoriesDirectory, repositoryName);
    const filenames = repoModule.getFilesFromDir(repoOutputDirectory, ['.js'], ['.min.js']);

    let files = [];
    filenames.forEach(file => {
        if (!file.includes('node_modules')) {
            files.push(path.join(repoOutputDirectory, file));
        }
    });
    return files;
}

main();