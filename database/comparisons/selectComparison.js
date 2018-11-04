let db = require('../connection');

module.exports = {
  withUserIdAndTripId(userId, tripId) {
    return db.any(
      `
        SELECT user_id,
               trip_id,
               city_id,
               rank
        FROM comparison
        WHERE comparison.user_id = $1
        AND comparison.trip_id = $2
      `,
      [userId, tripId]
    );
  }
};
