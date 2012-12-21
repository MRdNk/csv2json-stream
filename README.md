csv2json
========

csv file to json array - streaming

Optional Parameter:   
<dl>
  <dt>
    <dt>Object:</dt>
    <dl>
      <dt>delim => delimiter used</dt>
      <dl>
        <dt>\t for tab delimited file</dt>
        <dt>, for comma delimited file, will take care of double quoted values as well.</dt>
      </dl>
    </dl>
  </dt>
</dl>

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