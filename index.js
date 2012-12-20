var Stream = require('stream');

function Row (columns) {
  this.columns = columns;
  this.data = {};
  console.log('Constructor: this.columns ::' + this.columns);
  return this;
}

Row.prototype.parseToRow = function (data, delim, cb) {
  var that = this;
  var array = data.split(delim);
  console.log('array: ' + array + ' :', delim);

  for(var i=0; i<array.length; i++) {
    that.data[that.columns[i]] = array[i].replace(/"/g,'');
    console.log(array[i]);
  }

  // console.log('tath: ' + JSON.stringify(that.data));
  cb(null, JSON.stringify(that.data, null, 4));

};

function csv2json (opts) {

  var that = this;
  that.currentData = '';
  that.rows = [];
  that.started = false;

  that.opts = opts;
  if (!that.opts.delim || that.opts.delim === ',') {
    that.opts.delim = /,(?!(?:[^",]|[^"],[^"])+")/;
  }
  if (that.opts.delim == '\t') {
    that.opts.delim = '\\t';
  }
  if (typeof that.opts.doublequote === undefined) {
    that.opts.doublequote = true;
  }

  var s = new Stream();
  s.writable = true;
  s.readable = true;

  that.hasStarted = function () {
    if(that.started === false) {
      s.emit('data', '[');
      that.started = true;
    }
  };

  s.write = function (buffer) {
    that.currentData += buffer;

    that.hasStarted();
    
    if(that.currentData.indexOf('\r\n') !== -1) {
      var arr = that.currentData.split('\r\n');
      var len = arry.length;
    
      for(var i=0; i<len-1;i++) {
        var emitend = (i === len-2) ? ']' : ',';
        s.emit('data', arr[i] + emitend + '\n');
      }
    }

  };

  s.end = function (buffer) {

    var arr = that.currentData.split('\n');
    var len = arr.length;

    that.hasStarted();

    for(var i=0; i<len;i++) {
      var emitend = (i === len-1) ? '] \n' : ', \n';
      
      var dr = new Row(['Column1', 'Column2', 'Column3']);
      dr.parseToRow(arr[i], that.opts.delim, function (err, data) {
        s.emit('data', data + emitend);
      });

    }

    s.writable = false;
  };

  s.destroy = function () {
    s.writable = false;
  };

  return s;

}

module.exports = csv2json;