// Selecionar arquivos .js
// Buscar arquivos para analisar callbacks (err, error), promises (then, catch, all, any, race)
// Verificar se strings do tipo (.on, .once, .throw) utilizam strings para levantar eventos de erro
// Exemplo de linha de arquivo que está dando erro -> "#!/usr/bin/env node"
// Não considerar linhas que comecem com #!
// O problema são arquivos minimificados
// Melhor ignorar os arquivos que derem falha por enquanto e depois investigar o porquê da falha
// Colunas:
// caminho completo do arquivo
// número de promises
// número de promises que utilizam as palavras chaves
// número de callbacks de lançamento de erro
// número de callbacks que utilizam 'err' ou 'error' como nome da variável de erro
// Escrever o arquivo .csv para fazer a análise manual

require('dotenv').config();

const esprima = require('esprima');
const path = require('path');

const repoModule = require('./repository.js')
const fileModule = require('./files.js');
const nodegit = require('nodegit');

var projectPath = process.env.MANUAL_ANALYSIS_ROOT_PATH;

var inputGithubFilepath = path.join(projectPath, 'github.txt');
var outputGithubFilepath = path.join(projectPath, 'repos');

function main() {
    // nodegit.Clone(repos[i], outputGithubFilepath)
    //     .then(function(repo){
    //        console.log(repo);
    //     })
    //     .catch(console.log);

    var repos = repoModule.getRepos(inputGithubFilepath);
    var keywords = ['on', 'once', 'throw', 'catch', 'err', 'error', 'all', 'any', 'race'];
    var fields = ['filepath', 'promises', 'promises has keywords', 'callbacks', 'callbacks that uses err,error'];
    var filesToAnalyze = [];
    var failedOnFiles = [];
    // var workbook = fileModule.createWorkbook();
    // var style = fileModule.createStyle(workbook);

    for (var i = 0, len = repos.length; i < len; i++) {
        var repoName = repoModule.getRepoProjectName(repos[i]);
        var repoOutputDir = path.join(outputGithubFilepath, repoName);
        var jsFiles = repoModule.getFilesFromDir(repoOutputDir, ['.js']);
        for(var j = 0; jsFiles && j < jsFiles.length; j++){
            var fullFilepath = path.join(repoOutputDir, jsFiles[j]);
            var contents = fileModule.readFileSync(fullFilepath);
            try {
                var tokens = esprima.tokenize(contents);
                var tokensValues = tokens.map(function(token){
                    return token.value;
                });
                // Tokens são objetos, precisa comparar apenas a propriedade value de cada token com as keywords
                if (findOne(tokensValues, keywords)) {
                    filesToAnalyze.push(fullFilepath);
                }
            }catch(err){
                console.log('Failed to tokenize this file: ', fullFilepath);
                failedOnFiles.push(fullFilepath);
            }
        }
    }

    console.log(filesToAnalyze);
}

var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};

function testeFindOne(){
    var haystack = ['apple', 'banana', 'pineapple'];
    var arr = ['pineapple', 'passion fruit'];
    console.log(findOne(haystack, arr));
}

main();
