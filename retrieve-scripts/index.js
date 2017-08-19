require('dotenv').config();

const path = require('path');

const repoModule = require('./repository.js');

//var projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
var projectPath = '';

console.log(projectPath);
var inputGithubFilepath = path.join(projectPath, 'github.txt');
var outputGithubFilepath = path.join(projectPath, 'repos');

function main() {
    var repos = repoModule.getRepos(inputGithubFilepath);
    repos.forEach(function (repo) {
        repoModule.checkoutRepoTo(repo, outputGithubFilepath);
        var repoName = repoModule.getRepoProjectName(repo);
        var repoOutputDir = path.join(outputGithubFilepath, repoName);
        var files = repoModule.getFilesFromDir(repoOutputDir, ['.js']);
        console.log(files);
    });
}
main();
