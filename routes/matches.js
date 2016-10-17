var models = require('../models');

exports.update = function (req, res, next) {
  var now = new Date();
  models.match
    .update({
      homeScore: parseInt(req.body.homeScore),
      awayScore: parseInt(req.body.awayScore),
      reportedAt: now
    }, {
      where: { id: req.body.id }
    })
    .then(function (match) {
      res.status(200).send({ success: true });
    })
		.catch(function(err) {
			return next(err);
		});
}
