//var program = 'const answer = 42';
// var tokens = esprima.tokenize(program);
// console.log(tokens);
// [ { type: 'Keyword', value: 'const' },
//   { type: 'Identifier', value: 'answer' },
//   { type: 'Punctuator', value: '=' },
//   { type: 'Numeric', value: '42' } ]

var esprima = require('esprima');
var fs = require('fs');

var filepath = '';

var programTryCatch = 'try { callHook(); } catch (error) {  test.pushFailure(hookName + " failed on " + test.testName + ": " + (error.message || error), extractStacktrace(error, 0)); }';
var programPromise = 'new Promise(function(resolve, reject){ resolve(2); })';
var promiseAnotherPromise = 'const myFirstPromise = new Promise((resolve, reject) => { resolve(42) });'
var programEvent = 'const myEmitter =  new require(\'events\').EventEmitter; process.on(\'uncaughtException\', (err) => { console.log(\'whoops! there was an error\'); console.log(err); }); myEmitter.emit(\'error\', new Error(\'whoops!\'));';

function parseFromFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, program) {
        if (err) {
            console.log(err);
        }

        var programParsed = esprima.parse(program, {loc: true, range: true});
        console.log(programParsed);

    });
}

function parse(program){
    var programParsed = esprima.parse(program);
    console.log(JSON.stringify(programParsed));
}

function tokenize(program){
    var tokens = esprima.tokenize(program);
    console.log(tokens);
}


