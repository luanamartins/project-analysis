var testCase  = require('nodeunit').testCase;

const metricsModule = require('../retrieve-scripts/metrics');
const path = require('path');
require('dotenv').config();

var projectPath = '/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis';

module.exports = testCase({
    "Empty tries": function(test) {
        let filename = path.join(projectPath, 'data/input/program-try-empty-catch.js');
        const metricsObject = metricsModule.handleMetrics([filename]);
        const emptyTries = metricsObject.tryCatch.numberOfEmptyTries;

        test.equal(emptyTries, 1);
        test.done();
    },

    "Empty catches": function(test){
        let filename = path.join(projectPath, 'data/input/program-try-catch-empty.js');
        const metricsObject = metricsModule.handleMetrics([filename]);
        const emptyCatches = metricsObject.tryCatch.numberOfEmptyCatches;

        test.equal(emptyCatches, 1);
        test.done();
    }
});