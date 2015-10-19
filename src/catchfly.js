const catchfly = {};
const originalOnErrorHandler = window.onerror;

catchfly.endpoint = '';

catchfly.enable = function() {
  window.onerror = (message, url, line, col, errror) => {
    let data = {
      message,
      url,
      line,
      col
    };
    this.sendMessage(data);
  };
};

catchfly.disable = function() {
  window.onerror = originalOnErrorHandler;
};

catchfly.sendMessage = function(data) {
  if (this.beforeSend(data) === false) {
    return;
  }
  let beacon = new Image();
  let params = Object.keys(data).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
  }).join('&');
  let endpoint = this.endpoint.replace(/\/$/, '');
  beacon.src = `${endpoint}/send.gif?${params}`;
};

catchfly.sendException = function(error) {
  let data = {
    message: error.message,
    stack: error.stack
  };
  this.sendMessage(data);
};

catchfly.beforeSend = function(data) {
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
