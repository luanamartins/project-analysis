const path = require('path');
var fs = require('fs');
var _ = require('lodash');
var clone = require('git-clone');

function checkoutRepoTo(repo, outputDirectory) {
    var repoName = repo.substring(repo.lastIndexOf("/"));
    clone(repo, outputDirectory + repoName);
    console.log('Check out: ', repo);
}

function getRepos(filepath) {
    return fs.readFileSync(filepath).toString().split("\n");
}

function getRepoProjectName(fullRepoName) {
    return fullRepoName.substring(fullRepoName.lastIndexOf("/"));
}

function getFilesFromDir(dir, extensionsToInclude, extensionsToExclude) {
    var filesToReturn = [];

    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {

            var curFile = path.join(currentPath, files[i]);

            const acceptExtension = endsWithAny(curFile, extensionsToInclude);
            const notRejectExtension = !endsWithAny(curFile, extensionsToExclude);
            const isFile = fs.statSync(curFile).isFile();

            if (isFile && acceptExtension && notRejectExtension) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }

        }
    };
    walkDir(dir);
    return filesToReturn;
}

function endsWithAny(input, extensions) {
    return extensions.some(function (extension) {
        return input.endsWith(extension);
    });
}

module.exports = {
    getFilesFromDir: getFilesFromDir,
    checkoutRepoTo: checkoutRepoTo,
    getRepos: getRepos,
    getRepoProjectName: getRepoProjectName
};