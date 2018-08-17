const path = require('path');
const async = require('async');
const fs = require('fs');

const CONFIG = require("../config");

const repoModule = require(CONFIG["srcPath"] + 'repository.js');
const metricsModule = require(CONFIG["srcPath"] + 'metrics/metrics.js');
const filesModule = require(CONFIG["srcPath"] + 'files.js');
const utils = require(CONFIG["srcPath"] + 'utils.js');

const clientDirectory = CONFIG['dataProjectPath'] + 'repo/client';
const serverDirectory = CONFIG['dataProjectPath'] + 'repo/server';

const failedClientFilepath = CONFIG['dataProjectPath'] + 'result/failed-files-client.txt';
const failedServerFilepath = CONFIG['dataProjectPath'] + 'result/failed-files-server.txt';

const resultClientDirectory = CONFIG['dataProjectPath'] + 'result/client/';
const resultServerDirectory = CONFIG['dataProjectPath'] + 'result/server/';

const saveClientDirectory = CONFIG['saveMetricFilesPath'] + 'client/';
const saveServerDirectory = CONFIG['saveMetricFilesPath'] + 'server/';

const clientRepoFilepath = CONFIG['dataProjectPath'] + 'client.txt';
const serverRepoFilepath = CONFIG['dataProjectPath'] + 'server.txt';

function main() {
    const start = new Date();
    const hrstart = process.hrtime();
    
    const clientOptions = {
    	repoDirectory: clientDirectory,
		repoFilepath: clientRepoFilepath,
		resultDirectory: resultClientDirectory,
		failedFilepath: failedClientFilepath
    };

    const saveObjectClient = utils.getMetricsOnFileObject();
    processRepos(clientOptions, saveObjectClient);

    // save filenames
    saveFilenames(saveClientDirectory, saveObjectClient);

    const serverOptions = {
    	repoDirectory: serverDirectory,
		repoFilepath: serverRepoFilepath,
		resultDirectory: resultServerDirectory,
		failedFilepath: failedServerFilepath
    };

    const saveObjectServer = utils.getMetricsOnFileObject();
    processRepos(serverOptions, saveObjectServer);

    // save filenames
    saveFilenames(saveServerDirectory, saveObjectServer);

    console.log('Finished');
    const end = new Date() - start, hrend = process.hrtime(hrstart);

    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
}

function saveFilenames(directory, saveObject) {
    const metricList = utils.listPropertiesOf(saveObject);

    metricList.forEach((metric) => {
        const toSaveFilepath = directory + metric + '.txt';
        const content = saveObject[metric].join('\n');
        fs.writeFileSync(toSaveFilepath, content, 'utf8');
    });

}


function processRepos(options, saveObject) {

    const repositoriesName = utils.getDirectoriesNameFrom(options.repoDirectory);

    async.each(repositoriesName,
        function (repositoryName) {
            shouldRunParallel(repositoryName, saveObject, options)
        }, function (err) {
        console.log(err);
    });
}

function shouldRunParallel(repositoryName, saveObject, options) {
    async.waterfall(
        [
            async.apply(getFilesOfRepository, repositoryName, saveObject, options),
            extractMetricsFromFiles
        ]
    );
}

function getFilesOfRepository(repositoryName, saveObject, options, callback) {
    const files = getFilesFromDirectory(repositoryName, options.repoDirectory);
    callback(null, repositoryName, saveObject, options, files);
}

function extractMetricsFromFiles(repositoryName, saveObject, options, files, callback) {
    const metricsData = metricsModule.handleMetrics(files, saveObject, __dirname);

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