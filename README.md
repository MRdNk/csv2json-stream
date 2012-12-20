csv2json
========

csv file to json array - streaming

Optional Parameter:
Pass an object

delim => delimiter used

\t for tab delimited file

, for comma delimited file, will take care of double quoted values as well.

```node

var fs = require('fs');
var csv2json = require('./index.js');

var opts = {
  // delim : '\t'
  delim : ','
};

fs.createReadStream('csv.csv').pipe(csv2json(opts)).pipe(fs.createWriteStream('csv.json'));

```