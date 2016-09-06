var models = require('../models');

exports.forCampaign = function(req, res, next) {
	models.coach
		.findAll({ where: { campaignId: req.params.campaign }})
		.then(function(coaches) {
			res.json(coaches.map(function(coach) {
				return coach.get({ plain: true });
			}));
		});
};

exports.byId = function(req, res, next) {
	models.coach
		.findById(req.params.id, { include: [{ model: models.plot }] })
		.then(function(coach) {
    	res.json(coach.get({ plain: true }));
		});
};

exports.insert = function(req, res, next) {
  var coach = req.body;
	models.coach
		.build(coach)
		.save()
		.then(function(newCoach) {
    	res.status(201).json({ success: true });
		});
};

exports.update = function(req, res, next) {
	models.coach
		.update({
			name: req.body.name,
			guild: req.body.guild,
			email: req.body.email,
			confirmed: req.body.confirmed,
			league_points: req.body.league_points,
			campaign_points: req.body.campaign_points,
			favours: req.body.favours
		}, {
			where: { id: req.body.id }
		})
		.then(function(coach) {
			res.status(200).send({ success: true });
		})
		.catch(function(err) {
			return next(err);
		});
};
