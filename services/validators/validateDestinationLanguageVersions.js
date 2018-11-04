let validateLanguage = require('./validateLanguage');
let validateName = require('./validateName');
let validateUrlName = require('./validateUrlName');

module.exports = function(destinationLanguageVersions, checkIsUrlNameAlreadyTaken) {

  if (!Array.isArray(destinationLanguageVersions)
     || destinationLanguageVersions.length === 0) {

    return Promise.reject({
      code: 'no_language_versions',
      element: 'language_version',
      success: false
    });

  }

  return Promise.all(
    destinationLanguageVersions.map(
      destinationLanguageVersion => validateDestinationLanguageVersion(
        destinationLanguageVersion,
        checkIsUrlNameAlreadyTaken
      )
    )
  );
};

function validateDestinationLanguageVersion(destination, checkIsUrlNameAlreadyTaken) {

  let getErrorMessage = getErrorMessageFor(destination.language);

  if (!validateLanguage(destination.language)) {
    return Promise.reject(
      getErrorMessage('language', 'invalid')
    );
  }

  if (!validateName(destination.name)) {
    return Promise.reject(
      getErrorMessage('name', 'invalid')
    );
  }

  if (!validateUrlName(destination.urlName)) {
    return Promise.reject(
      getErrorMessage('urlName', 'invalid')
    );
  }

  return checkIsUrlNameAlreadyTaken(
    destination.urlName,
    destination.language
  ).then(
    () => true
  ).catch(
    () => false
  ).then(alreadyTaken => {
    if (alreadyTaken) {
      return Promise.reject(
        getErrorMessage('urlName', 'already_exists')
      );
    }
  });

}

function getErrorMessageFor(language) {
  return function(element, code) {
    return {
      code,
      element,
      language,
      success: false
    };
  };
}
