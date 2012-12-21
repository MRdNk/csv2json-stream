csv2json
========

csv file to json array - streaming

Optional Parameter:   
<dl>
  <dl>
    <dt>Object:</dd>
    <dl>
      <dd>delim => delimiter used</dd>
      <dl>
        <dd>\t for tab delimited file</dd>
        <dd>, for comma delimited file, will take care of double quoted values as well.</dd>
      </dl>
    </dl>
  </dl>
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