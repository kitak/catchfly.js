'use strict';

var torimochi = {};
var originalOnErrorHandler = window.onerror;

torimochi.endpoint = '';

torimochi.enable = function () {
  var _this = this;

  window.onerror = function (message, url, line, col, errror) {
    var data = {
      message: message,
      url: url,
      line: line,
      col: col
    };
    _this.sendMessage(data);
  };
};

torimochi.disable = function () {
  window.onerror = originalOnErrorHandler;
};

torimochi.sendMessage = function (data) {
  if (this.beforeSend(data) === false) {
    return;
  }
  var beacon = new Image();
  var params = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  var endpoint = this.endpoint.replace(/\/$/, '');
  beacon.src = endpoint + '/send.gif?' + params;
};

torimochi.sendException = function (error) {
  var data = {
    message: error.message,
    stack: error.stack
  };
  this.sendMessage(data);
};

torimochi.beforeSend = function (data) {
  // TODO implement
  return true;
};

if (typeof define === 'function' && define['amd']) {
  define(['exports'], torimochi);
} else if (typeof module === 'object' && module.exports) {
  module.exports = torimochi;
} else {
  window.torimochi = torimochi;
}