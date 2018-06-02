const path = require('path');
const async = require('async');

const CONFIG = require("../../config");

const repoModule = require(CONFIG["srcPath"] + 'repository.js');
const metricsModule = require(CONFIG["srcPath"] + 'metrics/metrics.js');
const filesModule = require(CONFIG["srcPath"] + 'files.js');
const utils = require(CONFIG["srcPath"] + 'utils.js');

const clientDirectory = path.join(__dirname, '..', 'data', 'repo', 'client');
const serverDirectory = path.join(__dirname, '..', 'data', 'repo', 'server');

const failedClientFilepath = path.join(__dirname, '..', 'data', 'result', 'failed-files-client.txt');
const failedServerFilepath = path.join(__dirname, '..', 'data', 'result', 'failed-files-server.txt');

const resultClientDirectory = path.join(__dirname, '..', 'data', 'result', 'client/');
const resultServerDirectory = path.join(__dirname, '..', 'data', 'result', 'server/');

const clientRepoFilepath = path.join(__dirname, '..', 'data', 'client.txt');
const serverRepoFilepath = path.join(__dirname, '..', 'data', 'server.txt');

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

    const repositoriesName = utils.getDirectoriesNameFrom(options.repoDirectory);

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
    const metricsData = metricsModule.handleMetrics(files, __dirname);

    const repoObject = utils.getEmptyRepoObject();
    const headers = utils.listPropertiesOf(repoObject);

    filesModule.writeCsvFile(options.resultDirectory + repositoryName + '.csv', headers, metricsData.metrics);

    if(metricsData.failedFiles) {
        const failedFilesData = metricsData.failedFiles.join('\n');
        filesModule.appendDataToFile(options.failedFilepath, failedFilesData);
    }

    callback(null);
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