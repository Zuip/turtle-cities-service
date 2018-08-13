module.exports = function(response) {

  if(response.status === 200) {
    return Promise.resolve(response);
  }

  return Promise.reject({
    status: response.status,
    message: response.json()
  });
};