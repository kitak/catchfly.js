const torimochi = {};
const originalOnErrorHandler = window.onerror;

torimochi.endpoint = '';

torimochi.enable = function() {
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

torimochi.disable = function() {
  window.onerror = originalOnErrorHandler;
};

torimochi.sendMessage = function(data) {
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

torimochi.sendException = function(error) {
  let data = {
    message: error.message,
    trace: error.trace
  };
  this.sendMessage(data);
};

torimochi.beforeSend = function(data) {
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
