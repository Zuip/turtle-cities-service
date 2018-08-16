let db = require('../connection');
let selectComparison = require('./selectComparison');

module.exports = function(userId, tripId, rankedCities) {
  return selectComparison.withUserIdAndTripId(
    userId,
    tripId
  ).then(
    ranks => ranks.map(rank => rank.city_id)
  ).then(
    previousComparisonCityIds => Promise.all([
      deleteComparisonCities(
        userId,
        tripId,
        previousComparisonCityIds.filter(
          previousComparisonCityId => !rankedCities.includes(
            previousComparisonCityId
          )
        )
      ),
      updateComparisonCities(
        userId,
        tripId,
        rankedCities,
        rankedCities.filter(
          rankedCity => previousComparisonCityIds.includes(
            rankedCity
          )
        )
      ),
      createComparisonCities(
        userId,
        tripId,
        rankedCities,
        rankedCities.filter(
          rankedCity => !previousComparisonCityIds.includes(
            rankedCity
          )
        )
      )
    ])
  );
};

function deleteComparisonCities(userId, tripId, cityIds) {

  if(cityIds.length === 0) {
    return;
  }

  return db.none(
    `
      DELETE FROM comparison
      WHERE user_id = $1
      AND trip_id = $2
      AND city_id IN ($3:csv)
    `,
    [
      userId,
      tripId,
      cityIds
    ]
  );
}

function updateComparisonCities(userId, tripId, rankedCities, cityIdsToUpdate) {
  return Promise.all(
    rankedCities.map((cityId, rankIndex) => {

      if(!cityIdsToUpdate.includes(cityId)) {
        return;
      }

      return updateRank(
        userId,
        tripId,
        cityId,
        rankIndex + 1
      );
    })
  );
}

function updateRank(userId, tripId, cityId, rank) {
  return db.none(
    `
      UPDATE comparison
      SET rank = $4
      WHERE user_id = $1
      AND trip_id = $2
      AND city_id = $3
    `,
    [userId, tripId, cityId, rank]
  );
}

function createComparisonCities(userId, tripId, rankedCities, newCityIds) {
  return Promise.all(
    rankedCities.map((cityId, rankIndex) => {

      if(!newCityIds.includes(cityId)) {
        return;
      }

      return insertRank(
        userId,
        tripId,
        cityId,
        rankIndex + 1
      );
    })
  );
}

function insertRank(userId, tripId, cityId, rank) {
  return db.none(
    `
      INSERT INTO comparison (
        user_id,
        trip_id,
        city_id,
        rank
      )
      VALUES ($1, $2, $3, $4)
    `,
    [userId, tripId, cityId, rank]
  );
}
