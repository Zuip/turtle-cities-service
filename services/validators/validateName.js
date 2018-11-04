module.exports = function(name) {

  if (typeof name !== 'string') {
    return false;
  }

  return name.length !== 0;
};
