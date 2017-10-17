require('dotenv').config();

const path = require('path');

const repoModule = require('./repository.js');
const metricsModule = require('./metrics.js');

var projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
console.log(projectPath);

let inputGithubFilepath = path.join(projectPath, 'github.txt');
var outputGithubFilepath = path.join(projectPath, 'repos');
const checkoutRepos = false;

function main() {
    let repositoriesName = [];
    if (checkoutRepos) {
        let reposToCheckout = repoModule.getRepos(inputGithubFilepath);
        reposToCheckout.forEach(function (repo) {
            repoModule.checkoutRepoTo(repo, outputGithubFilepath);
            let repoName = repoModule.getRepoProjectName(repo);
            repositoriesName.push(repoName);
        });
    } else {
        repositoriesName = ['bootstrap'];
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
        allMetrics.push(metricsModule.handleMetrics(files, repoObjectFilepath));
    });

    console.log(allMetrics);
}


function test() {
    const files = [path.join(projectPath, 'test.js'), path.join(projectPath, 'test.js')];
    const repoObjectFilepath = path.join(projectPath, 'report-object.json');
    const report = metricsModule.handleMetrics(files, repoObjectFilepath);
}


main();
