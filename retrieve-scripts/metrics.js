const esprima = require('esprima');

function traverse(obj, fn) {
    for (var key in obj) {
        if (obj[key] !== null && fn(obj[key]) === false) {
            return false;
        }
        if (typeof obj[key] == 'object' && obj[key] !== null) {
            if (traverse(obj[key], fn) === false) {
                return false;
            }
        }
    }
}


function getMetrics(filepath){
    fs.readFile(filepath, function(err, file) {
        var syntax = esprima.parse(file.toString());

        var numberOfTries = 0, numberOfCatches = 0, numberOfThrows = 0, numberOfPromises = 0;

        traverse(syntax, function(obj) {
            if (obj.type == 'TryStatement') {
                numberOfTries++;
            }

            if(obj.handler && obj.handler.type === 'CatchClause'){
                numberOfCatches++;
            }

            if(obj.type == 'ThrowStatement'){
                numberOfThrows++;
            }

            if(obj.type == 'NewExpression' && obj.callee.name == 'Promise'){
                numberOfPromises++;
            }

            // if(obj.type == 'CallStatement'){
            //     if(obj.property && ['resolve', 'reject'].indexOf(obj.property.name) >= 0){
            //         // TODO
            //     }
            // }

        });
        console.log('Try: ', numberOfTries);
        console.log('Catch: ', numberOfCatches);
        console.log('Throw: ', numberOfThrows);
        console.log('Promise: ', numberOfPromises);
    });
}

module.exports = {
    getMetrics: getMetrics
};