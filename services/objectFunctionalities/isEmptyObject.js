module.exports = function(obj) {

  let name;

  for(name in obj) {
    
    if(!obj.hasOwnProperty(name)) {
      continue;
    }

    if(typeof obj[name] !== 'undefined') {
      return false;
    }
  }

  return true;
};