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

var projectPath = process.env.MANUAL_ANALYSIS_ROOT_PATH;

var inputGithubFilepath = path.join(projectPath, 'github.txt');
var outputGithubFilepath = path.join(projectPath, 'repos');

function main() {
    var repos = repoModule.getRepos(inputGithubFilepath);
    var keywords = ['.on', '.once', '.throw', '.catch', 'err', 'error', '.all', '.any', '.race'];
    var fields = ['filepath', 'promises', 'promises has keywords', 'callbacks', 'callbacks that uses err,error'];
    // var workbook = fileModule.createWorkbook();
    // var style = fileModule.createStyle(workbook);
    var repo;
    var tableData = [];

    for (var i = 0, len = repos.length; i < len; i++) {
        repo = repos[i];
        repoModule.checkoutRepoTo(repo, outputGithubFilepath, function () {

            var repoName = repoModule.getRepoProjectName(repo);
            var repoOutputDir = path.join(outputGithubFilepath, repoName);
            var jsFiles = repoModule.getFilesFromDir(repoOutputDir, ['.js']);
            var failOnFiles = [];
            var filesToAnalyze = [];
            var sheetData = {};
            sheetData.sheetname = repoName;

            for (var j = 0, jsFilesLen = jsFiles.length; j < jsFilesLen; j++) {
                var file = jsFiles[j];
                var fullFilepath = path.join(repoOutputDir, file);
                console.log(fullFilepath);
                var contents = fileModule.readFileSync(fullFilepath);
                try {
                    var tokens = esprima.tokenize(contents);
                    if (findOne(tokens, keywords)) {
                        filesToAnalyze.push(fullFilepath);
                    }
                } catch (err) {
                    console.log('Fail to parse: ', fullFilepath);
                    failOnFiles.push(fullFilepath);
                }

                // if (j == jsFilesLen - 1) {
                //     data.push(filesToAnalyze);
                //     var sheet = fileModule.createSheet(workbook, repoName);
                //     fileModule.writeSheet(sheet, data, style);
                // }
            }

            sheetData.files = filesToAnalyze;
            tableData.push(sheetData);

            if(i == len){
                console.log(tableData);
            }

        });
    }
}

var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};

main();
