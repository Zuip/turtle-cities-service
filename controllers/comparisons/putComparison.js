let updateComparison = require('../../database/comparisons/updateComparison');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateCityIds = require('../../services/routing/validators/validateCityIds');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateCityIds(
      req.body,
      sendFailure
    )
  ).then(
    () => updateComparison(
      req.params.userId,
      req.params.tripId,
      req.body
    ).catch(
      () => sendFailure(500, {
        success: false,
        message: 'Saving comparison failed'
      })
    )
  ).then(() => {
    res.json({ success: true });
  }).catch(() => {
    // Promise chain ended
  });
};
