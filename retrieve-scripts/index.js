require('dotenv').config();

const path = require('path');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics.js');
const filesModule = require('./files.js');
const utils = require('./utils.js');

const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
console.log(projectPath);

let inputGithubFilepath = path.join(projectPath, 'github.txt');
const outputGithubFilepath = path.join(projectPath, 'repos');
const checkoutRepos = true;

function main() {
    let repositoriesName = getRepositoriesNames();

    repositoriesName.forEach(function (repositoryName) {
        let files = getFilesFromDirectory(repositoryName);

        const metricsPerScript = metricsModule.handleMetrics(files, projectPath);

        const fields = utils.listPropertiesOf(utils.createRepoObject(projectPath));

        const data = metricsPerScript.map(repoObject => {
            let metrics = {
                numberOfLogicalLines: repoObject.numberOfLogicalLines,
                numberOfPhysicalLines: repoObject.numberOfPhysicalLines
            };
            Object.assign(metrics, repoObject.tryCatch, repoObject.promise, repoObject.asyncAwait, repoObject.events, repoObject.callbacks);

            return metrics;
        });

        filesModule.writeCsvFile('./statistics/data/' + repositoryName + '.csv', fields, data);

    });
    console.log('Finished');
}

function getRepositoriesNames() {
    let repositoriesName = [];
    if (checkoutRepos) {
        let reposToCheckout = repoModule.getRepos(inputGithubFilepath);
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, outputGithubFilepath);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName.replace("/", ""));
        });
    } else {
        repositoriesName = ['socket.io'];
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