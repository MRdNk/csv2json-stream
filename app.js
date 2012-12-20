var fs = require('fs');
var csv2json = require('./index.js');

var opts = {
  // delim : '\t'
  delim : ','
};

fs.createReadStream('csv.csv').pipe(csv2json(opts)).pipe(fs.createWriteStream('csv.json'));