let bodyParser = require('body-parser');
let express = require('express');

let getCitiesController = require('./controllers/cities/getCities');
let getCountriesController = require('./controllers/countries/getCountries');
let getCountryCitiesController = require('./controllers/countries/getCountryCities');
let postCityController = require('./controllers/cities/postCity');
let postCountryController = require('./controllers/countries/postCountry');

let app = express();

// This makes it easier to handle posted JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3002, () => console.log('turtle-auth listening on port 3002!'));

app.set('etag', false);

app.get('/api/cities', getCitiesController);
app.get('/api/countries', getCountriesController);
app.get('/api/countries/:countryId/cities', getCountryCitiesController);
app.post('/api/countries', postCountryController);
app.post('/api/countries/:countryId/cities', postCityController);
