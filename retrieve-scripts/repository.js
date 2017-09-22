const path = require('path');
var fs = require('fs');
var _ = require('lodash');
var clone = require('git-clone');

function checkoutRepoTo(repo, outputDirectory) {
    var repoName = repo.substring(repo.lastIndexOf("/"));
    clone(repo, outputDirectory + repoName);
    console.log('Check out: ', repo);
}

function getRepos(filepath){
    return fs.readFileSync(filepath).toString().split("\n");
}

function getRepoProjectName(fullRepoName){
    return fullRepoName.substring(fullRepoName.lastIndexOf("/"));
}

function getFilesFromDir(dir, fileTypes, removeFileTypes) {
    var filesToReturn = [];
    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {

            var curFile = path.join(currentPath, files[i]);

            const hasFiletype = fileTypes.indexOf(path.extname(curFile)) != -1;
            // TODO this is not considering .min.js yet
            const notHasRemoveFileTypes = removeFileTypes.indexOf(path.extname(curFile)) == -1;
            const isFile = fs.statSync(curFile).isFile();

            if (isFile && hasFiletype && notHasRemoveFileTypes) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }

        }
    };
    walkDir(dir);
    return filesToReturn;
}


module.exports = {
    getFilesFromDir: getFilesFromDir,
    checkoutRepoTo: checkoutRepoTo,
    getRepos: getRepos,
    getRepoProjectName: getRepoProjectName
};