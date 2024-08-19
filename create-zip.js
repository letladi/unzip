const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, 'node_modules.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function () {
  console.log(`${archive.pointer()} total bytes`);
  console.log('Zip file has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory('node_modules/', false);
archive.finalize();
