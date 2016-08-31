var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["coaches", "users"]);

exports.forCampaign = function(req, res, next) {
	db.coaches.find({ campaign_id: req.params.campaign }, function(err, coaches){
    if(err) return next(err);
		res.json(coaches);
	})
};

exports.byName = function(req, res, next) {
	db.coaches.findOne({ name: req.params.name }, function(err, coach){
    if(err) return next(err);
    res.json(coach);
	})
};

exports.insert = function(req, res, next) {
  var coach = req.body;
  db.users.findOne({ email: coach.email }, function(err, user) {
    if(err) return next(err);

    if(user)
      coach.user_id = user._id;

    db.coaches.insert(coach, function(err, item) {
      if(err) return next(err);
      res.status(201).json({ success: true });
    });
  });
};

exports.update = function(req, res, next) {
	var coach = req.body;
	db.coaches.findAndModify({
		query: { _id: mongojs.ObjectId(coach._id) },
		update: {
			$set: {
				name: coach.name,
				guild: coach.guild,
				email: coach.email,
				confirmed: coach.confirmed,
		    league_points: coach.league_points,
		    campaign_points: coach.campaign_points,
		    favours: coach.favours
			}
		}
	}, function(err, doc, lastError) {
		if(err) return next(err);
		res.status(200).send({ success: true });
	});
};
