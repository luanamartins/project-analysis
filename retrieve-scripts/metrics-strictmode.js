const utils = require('./utils');

function isGlobalStrictMode(ast, reportObject) {
    if (ast.body) {
        const firstStatement = ast.body[0];
        if (utils.isStrictMode(firstStatement)) {
            reportObject.numberOfStrictModeGlobal++;
        }
    }
}

function isLocalStrictMode(node, reportObject) {
    if (utils.isStrictMode(node)) {
        reportObject.numberOfStrictModeLocal++;
    }
}

function fixStrictMode(repoObject) {
    if (repoObject.numberOfStrictModeGlobal > 0) {
        repoObject.numberOfStrictModeLocal -= 1;
    }
}

module.exports = {
    isGlobalStrictMode,
    isLocalStrictMode,
    fixStrictMode
};