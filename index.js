var Stream = require('stream');

function Row (columns) {
  this.columns = columns;
  this.data = {};
  return this;
}

Row.prototype.parseToRow = function (data, delim, cb) {
  var that = this;
  var array = data.split(delim);
  
  for(var i=0; i<array.length; i++) {
    that.data[that.columns[i]] = array[i].replace(/"/g,'');
  }

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

  that.lineEnding = null;
  that.getLineEnding = function () {
    if(!that.lineEnding) {
      that.lineEnding = (that.currentData.indexOf('\r') !== -1) ? '\r\n' : '\n';
    }
    return that.lineEnding;
  };

  s.write = function (buffer) {
    that.currentData += buffer;

    that.hasStarted();
    that.getLineEnding();
    
    if(that.currentData.indexOf(that.lineEnding) !== -1) {
      var arr = that.currentData.split('\r\n');
      var len = arr.length;
    
      for(var i=0; i<len-1;i++) {
        var emitend = (i === len-2) ? ']' : ',';
        var dr = new Row(that.opts.columns);
        dr.parseToRow(arr[i], that.opts.delim, function (err, data) {
          s.emit('data', data + emitend);
        });
      }

    }
  };

  s.end = function (buffer) {

    that.getLineEnding();

    var arr = that.currentData.split(that.lineEnding);
    var len = arr.length;

    that.hasStarted();

    for(var i=0; i<len;i++) {
      var emitend = (i === len-1) ? '] \n' : ', \n';
      
      var dr = new Row(that.opts.columns);
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