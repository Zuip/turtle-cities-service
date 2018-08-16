let RankDataNaming = require('../../services/dataNaming/Rank');
let selectComparison = require('../../database/comparisons/selectComparison');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => selectComparison.withUserIdAndTripId(
      req.params.userId,
      req.params.tripId
    ).then(ranks => {
      return ranks.map(rank => {
        let rankDataNaming = new RankDataNaming();
        rankDataNaming.DBNamed = rank;
        rankDataNaming.transformDBToAPINamed();
        return rankDataNaming.APINamed;
      });
    }).catch(
      () => sendFailure(
        500,
        'There was an error in selecting comparison from database'
      )
    )
  ).then(comparison => {
    res.json(comparison);
  }).catch(() => {
    // Promise chain ended
  });
};
