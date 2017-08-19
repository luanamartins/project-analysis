const fs = require('fs');

function copyFile(src, dest) {
    let readStream = fs.createReadStream(src);
    readStream.once('error', (err) => {
        console.log(err);
    });
    readStream.once('end', () => {
        console.log('done copying');
    });
    readStream.pipe(fs.createWriteStream(dest));
}

function readFileSync(filepath){
    return fs.readFileSync(filepath, 'utf8');
}

module.exports = {
    copyFile: copyFile,
    readFileSync: readFileSync
}