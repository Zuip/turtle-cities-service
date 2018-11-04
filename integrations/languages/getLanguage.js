let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../config');
let get = GetCreator(config.integrations.languages.url);

module.exports = {
  withCode(code) {
    return get(
      '/api/languages/' + code
    );
  },
  withCodeAndTranslatedIn(code, translatedIn) {
    return get(
      '/api/languages/' + code + '?language=' + translatedIn
    );
  }
};
