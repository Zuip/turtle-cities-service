module.exports = function(res) {
  return function(statusCode, message) {
    res.status(statusCode).json(message);
    return Promise.reject();
  };
};
