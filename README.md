csv2json
========

csv file to json array - streaming

Optional Parameter:

```node

var options = {
    delim : ',' // Defaults to comma (which includes double quote support), \t also supported
  , columns : ['Name', 'TwitterName'] // Array of column names, defaults to Column0 -> Column[n]
  , headers: true // First line is the columns headers / keys => headers wins over passed in columns
  , outputArray: true // Whether to output the resulting json as an array of json objects or not, enclose in square brackets [defaults false]
}
```

```node

var fs = require('fs');
var csv2json = require('./index.js');

var opts = {
  // delim : '\t'
  delim : ',',
  // columns: ['Column1', 'Column2', 'Column3'],
  headers: true,
  outputArray: true
};

fs.createReadStream('csv.csv').pipe(csv2json(opts)).pipe(fs.createWriteStream('csv.json'));

```

You can also run the basic test:

```node

node /test

```