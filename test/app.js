var fs = require('fs');
var path = require('path');
var csv2json = require('../index.js');

function runtest (file) {

  var opts = {
    // delim : '\t'
    delim : ',',
    columns: ['Column1', 'Column2', 'Column3']
  };

  fs.createReadStream(path.resolve(__dirname, file)).pipe(csv2json()).pipe(fs.createWriteStream(path.resolve(__dirname, 'example.json')));
}

module.exports = runtest;