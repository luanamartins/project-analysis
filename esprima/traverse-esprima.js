var fs = require('fs');
var esprima = require('esprima');
var estraverse = require('estraverse');

var filename = 'output.txt';
//var filename = process.argv[2];
//fs.readFileSync(filename)
var ast = esprima.parse(fs.readFileSync(filename));

estraverse.traverse(ast, {
    enter: function(node){
        if (node.type === 'CatchClause'){
            console.log('Encountered assignment to', node.left.name);
        }
    }
});