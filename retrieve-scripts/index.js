require('dotenv').config()

var fs = require('fs');
var path = require('path');
var clone = require('git-clone');
var _ = require('lodash');

var projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
var inputGithubFilePath = path.join(projectPath, 'github.txt');
var outputGithubFilePath = path.join(projectPath, 'repos');
var outputJsFiles = path.join(projectPath, 'output');

function main() {
    var repos = fs.readFileSync(inputGithubFilePath).toString().split("\n");
    repos.forEach(function (repo) {
        //checkoutRepo(repo);
        walkingOnRepo(repo);
    });
}

function checkoutRepo(repo) {

    console.log('Checking out ', repo);

    var repoName = repo.substring(repo.lastIndexOf("/"));
    clone(repo, outputGithubFilePath + repoName);

    console.log('Checked out ', repo);
}

function walkingOnRepo(repo) {

    var dir = require('node-dir');
    var repoName = repo.substring(repo.lastIndexOf("/"));
    var repoDir = outputGithubFilePath + repoName;
    console.log('Getting js files from ', repoDir);

    dir.files(repoDir, function(err, files) {
        if (err) throw err;

        var jsFiles = _.filter(files, function(file){

            var isJSFile = file.endsWith('.js');

            var wordsOfInterest = ['catch', 'then', 'all', 'race'];
            var contents = fs.readFileSync(file, 'utf8');
            var containsWordsOfInterest = wordsOfInterest.some(function(word){
                return contents.indexOf(word) >= 0;
            });

            return isJSFile && containsWordsOfInterest;
        });

        console.log(_.size(jsFiles));
    });
}

function copyFile(src, dest) {

    let readStream = fs.createReadStream(src);
    readStream.once('error', (err) => {
        console.log(err);
    });
    readStream.once('end', () => {
        console.log('done copying');
    });
    readStream.pipe(fs.createWriteStream(dest));
}

main();
