// Selecionar arquivos .js
// Buscar arquivos para analisar callbacks (err, error), promises (then, catch, all, any, race)
// Verificar se strings do tipo (.on, .once, .throw) utilizam strings para levantar eventos de erro
// Exemplo de linha de arquivo que está dando erro -> "#!/usr/bin/env node"
// Não considerar linhas que comecem com #!
// O problema são arquivos minimificados
// Melhor ignorar os arquivos que derem falha por enquanto e depois investigar o porquê da falha
// Colunas:
// caminho completo do arquivo
// número de chamadas de métodos com o mesmo nome de métodos de promises (keywords)
// número de chamadas de métodos de promises
// número de callbacks de lançamento de erro
// número de callbacks de lançamento de erro que utilizam 'err' ou 'error' como nome da variável de erro
// número de chamadas de eventos de tratamento de erros
// número de chamadas de eventos de tratamento de erros que usam string
// número de chamadas de eventos .on que usam string
// número de chamadas de eventos .once que usam string
// número de chamadas de eventos .emit que usam string

// Escrever o arquivo .csv para fazer a análise manual

require('dotenv').config();

const esprima = require('esprima');
const path = require('path');
const excel = require('excel4node');
const lodash = require('lodash');

const repoModule = require('./repository.js')
const fileModule = require('./files.js');
const nodegit = require('nodegit');

var projectPath = process.env.MANUAL_ANALYSIS_ROOT_PATH;

var inputGithubFilepath = path.join(projectPath, 'github.txt');
var clientReposPath = path.join(projectPath, 'repo-clients.txt');
var serverReposPath = path.join(projectPath, 'repo-servers.txt');
var outputGithubFilepath = path.join(projectPath, 'repos');

function main() {
    //var repos = repoModule.getRepos(inputGithubFilepath);
    var clientRepos = repoModule.getRepos(clientReposPath);
    var serverRepos = repoModule.getRepos(serverReposPath);

    clientRepos = randomElements(clientRepos, 3);
    serverRepos = randomElements(serverRepos, 3);

    var repos = clientRepos.concat(serverRepos);

    var keywords = ['throw', 'catch', 'all', 'any', 'race', ', function(', ',function(', ', function (', ',function ('];
    var fields = ['Filepath', 'callbacks for EHM', 'callbacks for EHM with err, error',
        'events (strings)', 'events EHM (strings)', 'events EHM (strings) using err, error, exception'];

    var workbook = new excel.Workbook();
    var style = workbook.createStyle({
        font: {
            color: '#000000',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

    for (var i = 0, len = repos.length; i < len; i++) {

        // nodegit.Clone(repos[i], outputGithubFilepath)
        //     .then(function (repo) {
        //         console.log(repo);
        //     })
        //     .catch(console.log);

        var filesToAnalyze = [];
        var failedOnFiles = [];

        var repoName = repoModule.getRepoProjectName(repos[i]).replace("/", "");
        var repoOutputDir = path.join(outputGithubFilepath, '/' + repoName);
        var jsFiles = repoModule.getFilesFromDir(repoOutputDir, ['.js']);
        jsFiles = lodash.shuffle(jsFiles);
        var sheet = workbook.addWorksheet(repoName);

        for (var j = 0; jsFiles && j < jsFiles.length; j++) {
            var fullFilepath = path.join(repoOutputDir, jsFiles[j]);
            var contents = fileModule.readFileSync(fullFilepath);
            try {
                var any = containsAtLeastOne(contents, keywords);
                if (containsAtLeastOne(contents, keywords)) {
                    filesToAnalyze.push(jsFiles[j]);
                }
            } catch (err) {
                //console.log('Failed to tokenize this file: ', fullFilepath);
                failedOnFiles.push(fullFilepath);
            }
        }

        fileModule.writeSheet(sheet, fields, filesToAnalyze, style);

        console.log('Repository: ', repoName);
        console.log('Total of files: ', filesToAnalyze.length);
        console.log('Failed to analyze files: ', failedOnFiles.length);
        console.log('');
    }

    workbook.write('manual-analysis/manual-analysis.xlsx');

    //console.log(filesToAnalyze);
    // console.log('Total of files: ', filesToAnalyze.length);
}

function randomElements(array, count) {
    if (count < 1 || count > array.length) {
        return [];
    }
    return lodash.shuffle(array).slice(0, count);
}

function testRandomElements(){
    var array = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
    console.log(randomElements(array, 3));
}

function containsAtLeastOne(input, array){
    var contains = array.some(function(item){
        return input.indexOf(item) >= 0;
    });

    return contains;
}

var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};

function testeFindOne() {
    var haystack = ['apple', 'banana', 'pineapple'];
    var arr = ['pineapple', 'passion fruit'];
    console.log(findOne(haystack, arr));
}

//testRandomElements();
main();
