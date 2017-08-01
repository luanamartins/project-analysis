var fs = require('fs');
var esprima = require('esprima');
var estraverse = require('estraverse');

var filename = process.argv[2];
console.log('Processing', filename);
//fs.readFileSync(filename)
var ast = esprima.parse('var answer = 42;');
console.log(ast);
estraverse.traverse(ast, {
    enter: function(node){
        if (node.type === 'AssignmentExpression'){
            console.log('Encountered assignment to', node.left.name);
        }
    }
});