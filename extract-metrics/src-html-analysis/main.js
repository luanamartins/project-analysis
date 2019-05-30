var glob = require("glob")

// options is optional
options = null;

glob("extract-metrics/src-html-analysis/client-test/**/*.js", options, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    console.log(files);
});