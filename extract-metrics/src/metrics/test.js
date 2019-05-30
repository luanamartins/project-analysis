const sloc = require('sloc');
const fs = require('fs');

const url = 'input.js';
const fileContents = fs.readFileSync(url, "utf-8");
console.log(fileContents);
console.log(sloc(fileContents, "js"));