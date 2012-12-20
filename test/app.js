var fs = require('fs');
var csv2json = require('../index.js');

function runtest (file) {

  var opts = {
    // delim : '\t'
    delim : ','
  };

  fs.createReadStream(__dirname + '/' + file).pipe(csv2json(opts)).pipe(fs.createWriteStream(__dirname + '/' + 'example.json'));
}

module.exports = runtest;