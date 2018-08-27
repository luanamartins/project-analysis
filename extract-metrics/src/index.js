const path = require('path');
const async = require('async');
const fs = require('fs');

const config = require("../config");

const repoModule = require(config["srcPath"] + 'repository.js');
const metricsModule = require(config["srcPath"] + 'metrics/metrics.js');
const filesModule = require(config["srcPath"] + 'files.js');
const utils = require(config["srcPath"] + 'utils.js');

const clientDirectory = config['dataProjectPath'] + 'repo/client';
const serverDirectory = config['dataProjectPath'] + 'repo/server';
const testDirectory = config['dataProjectPath'] + 'test-repo';

const failedClientFilepath = config['dataProjectPath'] + 'result/failed-files-client.txt';
const failedServerFilepath = config['dataProjectPath'] + 'result/failed-files-server.txt';
const failedTestFilepath = config['dataProjectPath'] + 'test/test-result/failed-files.txt';

const resultClientDirectory = config['dataProjectPath'] + 'result/client/';
const resultServerDirectory = config['dataProjectPath'] + 'result/server/';
const resultTestDirectory = config['dataProjectPath'] + 'test/test-result/';

const saveClientDirectory = config['saveMetricFilesPath'] + 'client/';
const saveServerDirectory = config['saveMetricFilesPath'] + 'server/';
const saveTestDirectory = config['dataProjectPath'] + 'test/test-result/';

const clientMetricSizeDirectory = config['dataProjectPath'] + 'result/metric-size/client/';
const serverMetricSizeDirectory = config['dataProjectPath'] + 'result/metric-size/server/';
const testMetricSizeDirectory = config['dataProjectPath'] + 'test/test-result/metric-size/';

const clientRepoFilepath = config['dataProjectPath'] + 'client.txt';
const serverRepoFilepath = config['dataProjectPath'] + 'server.txt';
const testRepoFilepath = config['dataProjectPath'] + 'test.txt';

function main() {
    const start = new Date();
    const hrstart = process.hrtime();

    const testOptions = {
        repoDirectory: testDirectory,
        repoFilepath: testRepoFilepath,
        resultDirectory: resultTestDirectory,
        metricSizeDirectory: testMetricSizeDirectory,
        failedFilepath: failedTestFilepath
    };

    const saveObject = utils.getMetricsOnFileObject();
    processRepos(testOptions, saveObject);
    
    // const clientOptions = {
    // 	repoDirectory: clientDirectory,
	// 	repoFilepath: clientRepoFilepath,
	// 	resultDirectory: resultClientDirectory,
    //     metricSizeDirectory: clientMetricSizeDirectory,
	// 	failedFilepath: failedClientFilepath
    // };

    // const saveObjectClient = utils.getMetricsOnFileObject();
    // processRepos(clientOptions, saveObjectClient);

    // // save filenames
    // saveFilenameOfMetrics(saveClientDirectory, saveObjectClient);

    // const serverOptions = {
    // 	repoDirectory: serverDirectory,
	// 	repoFilepath: serverRepoFilepath,
	// 	resultDirectory: resultServerDirectory,
    //     metricSizeDirectory: serverMetricSizeDirectory,
	// 	failedFilepath: failedServerFilepath
    // };

    // const saveObjectServer = utils.getMetricsOnFileObject();
    // processRepos(serverOptions, saveObjectServer);

    // // save filenames
    // saveFilenameOfMetrics(saveServerDirectory, saveObjectServer);

    console.log('Finished');
    const end = new Date() - start, hrend = process.hrtime(hrstart);

    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
}

function saveFilenameOfMetrics(directory, saveObject) {
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

    if (metricsData.failedFiles) {
        const failedFilesData = metricsData.failedFiles.join('\n');
        filesModule.appendDataToFile(options.failedFilepath, failedFilesData);
    }

    if (metricsData.metrics_handlers) {
        // console.log(metrics_handlers);
        // const handlersData = metricsData.metrics_handlers.join('\n');
        const filepath = options.metricSizeDirectory + repositoryName + '.csv';
        const fields = ['mech', 'lines', 'stmts', 'has_error_arguments'];
        filesModule.writeCsvFile(filepath, fields, metricsData.metrics_handlers);
    }

    callback(null);
}

function getFilesFromDirectory(repositoryName, repositoriesDirectory) {
    const repoOutputDirectory = path.join(repositoriesDirectory, repositoryName);
    const extensionsToInclude = ['.js'];
    const extensionsToExclude = ['.min.js'];
    const filenames = repoModule.getFilesFromDir(repoOutputDirectory, extensionsToInclude, extensionsToExclude);

    let files = [];
    filenames.forEach(file => {
        if (!file.includes('node_modules')) {
            files.push(path.join(repoOutputDirectory, file));
        }
    });
    return files;
}

main();