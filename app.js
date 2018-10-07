let bodyParser = require('body-parser');
let express = require('express');

let getCitiesController = require('./controllers/cities/getCities');
let getCityController = require('./controllers/cities/getCity');
let getCityTranslationsController = require('./controllers/cities/getCityTranslations');
let getComparisonController = require('./controllers/comparisons/getComparison');
let getCountriesController = require('./controllers/countries/getCountries');
let getCountryCitiesController = require('./controllers/countries/getCountryCities');
let getCountryCityWithUrlNamesAndLanguageController = require('./controllers/cities/getCountryCityWithUrlNamesAndLanguage');
let getCountryController = require('./controllers/countries/getCountry');
let getCountryTranslationsController = require('./controllers/countries/getCountryTranslations');
let getQuestionController = require('./controllers/questions/getQuestion');
let getQuestionsController = require('./controllers/questions/getQuestions');
let postCityController = require('./controllers/cities/postCity');
let postCountryController = require('./controllers/countries/postCountry');
let postQuestionController = require('./controllers/questions/postQuestion');
let putCityController = require('./controllers/cities/putCity');
let putComparisonController = require('./controllers/comparisons/putComparison');

let app = express();

// This makes it easier to handle posted JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3002, () => console.log('turtle-cities listening on port 3002!'));

app.set('etag', false);

app.get('/api/cities', getCitiesController);
app.get('/api/cities/:cityId', getCityController);
app.get('/api/cities/:cityId/translations', getCityTranslationsController);
app.get('/api/countries', getCountriesController);
app.get('/api/countries/:countryId', getCountryController);
app.get('/api/countries/:countryId/cities', getCountryCitiesController);
app.get('/api/countries/:countryId/translations', getCountryTranslationsController);
app.get('/api/countries/:countryUrlName/cities/:cityUrlName', getCountryCityWithUrlNamesAndLanguageController);
app.get('/api/questions', getQuestionsController);
app.get('/api/questions/:questionId', getQuestionController);
app.get('/api/users/:userId/trips/:tripId/cities/comparison', getComparisonController);
app.post('/api/countries', postCountryController);
app.post('/api/countries/:countryId/cities', postCityController);
app.post('/api/questions', postQuestionController);
app.put('/api/cities/:cityId', putCityController);
app.put('/api/users/:userId/trips/:tripId/cities/comparison', putComparisonController);