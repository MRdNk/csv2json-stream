var fs = require('fs');
var path = require('path');
var csv2json = require('../index.js');

function runtest (file) {

  var opts = {
    // delim : '\t'
    delim : ',',
    columns: ['Column1', 'Column2', 'Column3'],
    headers: true,
    outputArray: false
  };

  console.log('opts: ', opts)

  fs.createReadStream(path.resolve(__dirname, file)).pipe(csv2json(opts)).pipe(fs.createWriteStream(path.resolve(__dirname, 'example.json')));
}

module.exports = runtest;