let fetch = require('node-fetch');
let handleStatus = require('./handleStatus');

module.exports = function(root) {
  return function(path) {
    return fetch(
      root + path,
      { method: 'GET' }
    ).then(
      response => handleStatus(response)
    ).then(
      response => response.json()
    );
  };
};
