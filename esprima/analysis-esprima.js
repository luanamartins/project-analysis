const esprima = require('esprima');
const fs = require('fs');

const name = 'callback';
const filepath = 'data/input/program-' + name + '.js';
const outputFilepath = 'data/output/output-' + name + '.txt';

function parseFromFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, program) {
        if (err) {
            console.log(err);
        }

        console.log("Parsing: " + filepath);
        const options = {loc: false, range: false};
        const programParsed = esprima.parse(program, options);

        fs.writeFile(outputFilepath, JSON.stringify(programParsed, null, 4), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });
}

parseFromFile(filepath);

function parse(program) {
    const programParsed = esprima.parseScript(program);
    console.log(JSON.stringify(programParsed));
}

function tokenize(program) {
    const tokens = esprima.tokenize(program);
    console.log(tokens);
}


