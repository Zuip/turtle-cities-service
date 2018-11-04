module.exports = function(cities) {

  let countries = {};

  cities.map(city => {

    if (typeof countries[city.country.id] === 'undefined') {
      countries[city.country.id] = initializeCountry(city);
    }

    countries[city.country.id].cities.push(initializeCity(city));
  });

  return Object.values(countries);
};

function initializeCountry(city) {
  return {
    id: city.country.id,
    name: city.country.name,
    urlName: city.country.urlName,
    cities: []
  };
}

function initializeCity(city) {
  return {
    id: city.id,
    latitude: city.latitude,
    longitude: city.longitude,
    name: city.name,
    urlName: city.urlName
  };
}
