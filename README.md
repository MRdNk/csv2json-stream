csv2json
========

csv file to json array - streaming

Optional Parameter:

```node

var options = {
    delim : ',' // Defaults to comma (which includes double quote support), \t also supported
  , columns : ['Name', 'TwitterName'] // Array of column names, defaults to Column0 -> Column[n]
}
```

```node

var fs = require('fs');
var csv2json = require('./index.js');

var opts = {
  // delim : '\t'
  delim : ',',
  columns: ['Column1', 'Column2', 'Column3']
};

fs.createReadStream('csv.csv').pipe(csv2json(opts)).pipe(fs.createWriteStream('csv.json'));

```

You can also run the basic test:

```node

node /test

```