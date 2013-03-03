var Stream = require('stream');

function Row (columns) {
  this.columns = columns || [];
  this.data = {};
  return this;
}

Row.prototype.parseToRow = function (data, delim, cb) {
  var that = this;
  var array = data.split(delim);

  var hasColumns;

  if(!that.columns) {
    hasColumns = false;
  }
  
  for(var i=0; i<array.length; i++) {
    if (!hasColumns) {
      that.columns.push('Column' + i);
    }
		var data = array[i].replace(/"/g,'').trim();
    that.data[that.columns[i]] = parseFloat(data) || parseInt(data) || data;
  }

  cb(null, JSON.stringify(that.data, null, 4));

};

function csv2json (opts) {

  var that = this;

  that.currentData = '';
  that.rows = [];
  that.started = false;
  that.headers = opts.headers || false;
  that.outputArray = opts.outputArray || false;

  that.opts = opts || {};
  if (!that.opts.delim || that.opts.delim === ',') {
    that.opts.delim = /,(?!(?:[^",]|[^"],[^"])+")/;
  }
  if (that.opts.delim === '\t') {
    that.opts.delim = '\\t';
  }
  if (typeof that.opts.doublequote === undefined) {
    that.opts.doublequote = true;
  }

  if(that.opts.headers === true) {
    that.heades = true;
  }

  var s = new Stream();
  s.writable = true;
  s.readable = true;

  that.hasStarted = function () {
    if(that.started === false) {
      if(that.outputArray) 
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

    that.getLineEnding();
      
    if(that.currentData.indexOf(that.lineEnding) !== -1) {
      var i = 0;
      var arr = that.currentData.split(that.lineEnding);

      // if the first line is headers has been set
      if (that.headers && that.started === false) {
        that.opts.columns = arr[0].split(that.opts.delim);
        i = 1;
        that.hasStarted();
      }

      var len = arr.length;
    
      for(; i<len-1;i++) {
        var emitend = (that.outputArray) ? ',' : '';
        var dr = new Row(that.opts.columns);
        dr.parseToRow(arr[i], that.opts.delim, function (err, data) {
          s.emit('data', data + emitend);
        });
      }

      that.currentData = arr[len-1];

    }
  };

  s.end = function (buffer) {

    that.getLineEnding();

    var arr = that.currentData.split(that.lineEnding);
    var len = arr.length;

    // if the first line is headers has been set
    if (that.headers && that.started === false) {
      that.opts.columns = arr[0].split(that.opts.delim);
      i = 1;
      that.hasStarted();
    }

    for(var i=0; i<len;i++) {
      var emitend;
      if (that.outputArray) 
        emitend = (i === len-1) ? '] \n' : ', \n';
      else 
        emitend = '\n';

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
