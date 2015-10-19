'use strict';

var catchfly = {};
var originalOnErrorHandler = window.onerror;

catchfly.endpoint = '';

catchfly.enable = function () {
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

catchfly.disable = function () {
  window.onerror = originalOnErrorHandler;
};

catchfly.sendMessage = function (data) {
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

catchfly.sendException = function (error) {
  var data = {
    message: error.message,
    stack: error.stack
  };
  this.sendMessage(data);
};

catchfly.beforeSend = function (data) {
  // TODO implement
  return true;
};

if (typeof define === 'function' && define['amd']) {
  define(['exports'], catchfly);
} else if (typeof module === 'object' && module.exports) {
  module.exports = catchfly;
} else {
  window.catchfly = catchfly;
}