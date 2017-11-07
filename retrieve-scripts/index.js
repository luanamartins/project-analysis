require('dotenv').config();

const path = require('path');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics.js');
const filesModule = require('./files.js');

var projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
console.log(projectPath);

let inputGithubFilepath = path.join(projectPath, 'github.txt');
var outputGithubFilepath = path.join(projectPath, 'repos');
const checkoutRepos = true;

function main() {
    let repositoriesName = [];
    if (checkoutRepos) {
        let reposToCheckout = repoModule.getRepos(inputGithubFilepath);
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, outputGithubFilepath);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName.replace("/", ""));
        });
    } else {
        repositoriesName = ['three.js'];
    }


    let allMetrics = [];
    repositoriesName.forEach(function (repositoryName) {
        let repoOutputDirectory = path.join(outputGithubFilepath, repositoryName);
        let filenames = repoModule.getFilesFromDir(repoOutputDirectory, ['.js'], ['.min.js']);
        //let files = filenames.map((file) => { path.join(repoOutputDirectory, file) });

        let files = [];
        filenames.forEach(file => {
            files.push(path.join(repoOutputDirectory, file));
        });
        const repoObjectFilepath = path.join(projectPath, 'report-object.json');
        const metricsPerScript = metricsModule.handleMetrics(files, repoObjectFilepath);
        allMetrics.push(metricsPerScript);

        // const fields = ["numberOfPromises", "numberOfResolves", "numberOfRejects",
        //     "numberOfPromiseThens", "numberOfPromiseThenLines", "numberOfPromiseCatches",
        //     "numberOfPromiseCatchesLines", "numberOfEmptyFunctionsOnPromiseCatches",
        //     "numberOfPromiseRaces", "numberOfPromiseAll"];

        // const promiseData = metricsPerScript.map(repoObject => {
        //     return repoObject.promise;
        // });

        const fields = [
            "numberOfCallbackErrorFunctions",
            "numberOfFirstErrorArgFunctions",
            "numberOfEmptyCallbacks",
            "numberOfConsoleStatementOnly",
            "numberOfLogicalLines",
            "numberOfPhysicalLines"
        ];

        const data = metricsPerScript.map(repoObject => {
            let metrics = repoObject.callbacks;
            metrics.numberOfLogicalLines = repoObject.numberOfLogicalLines;
            metrics.numberOfPhysicalLines = repoObject.numberOfPhysicalLines;
            return metrics;
        });

        filesModule.writeCsvFile('./statistics/data/' + repositoryName + '.csv', fields, data);

    });
    console.log('Finished');
}


function test() {
    const files = [path.join(projectPath, 'test.js'), path.join(projectPath, 'test.js')];
    const repoObjectFilepath = path.join(projectPath, 'report-object.json');
    const metrics = metricsModule.handleMetrics(files, repoObjectFilepath);
    console.log(metrics);
}


main();
