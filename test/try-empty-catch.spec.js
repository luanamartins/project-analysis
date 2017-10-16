const path = require('path');
var dotenv = require('dotenv');
dotenv.load();

var testCase  = require('nodeunit').testCase;

const metricsModule = require('../retrieve-scripts/metrics');

var projectPath = 'project-analysis';
let filename = path.join(projectPath, 'data/input/program-try-empty-catch.js');

const metricsObject = metricsModule.handleMetrics([filename]);

module.exports = testCase({
    "Empty tries": function(test) {
        const metric = metricsObject.tryCatch.numberOfEmptyTries;
        test.equal(metric, 1);
        test.done();
    },

    "Catch lines": function(test){

        const metric1 = metricsObject.tryCatch.numberOfCatches;
        test.equal(metric1, 1);

        const metric = metricsObject.tryCatch.numberOfCatchesLines;
        test.equal(metric, 4);

        test.done();
    },

    "Finally lines": function(test){

        const metric1 = metricsObject.tryCatch.numberOfFinallies;
        test.equal(metric1, 1);

        const metric = metricsObject.tryCatch.numberOfFinalliesLines;
        test.equal(metric, 4);

        test.done();
    },

});