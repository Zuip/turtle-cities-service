module.exports = function(cities) {

  let countries = {};

  cities.map(city => {

    if(typeof countries[city.country.id] === 'undefined') {
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
    cities: []
  };
}

function initializeCity(city) {
  return {
    id: city.id,
    name: city.name
  };
}