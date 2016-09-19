var models = require('../models');

exports.byUser = function(req, res, next) {
	models.campaign.findAll({
		where: {
			userId: req.params.userId
		}
	}).then(function(campaigns){
		res.json(campaigns.map(function(item) {
			return item.get({ plain: true });
		}));
	});
};

exports.byTitle = function(req, res, next) {
	models.campaign.findOne({
		where: {
			title: req.params.title
		},
		include: [
			{ model: models.round, include: [models.match] },
			{ model: models.coach }
		]
	}).then(function(campaign){
		res.json(campaign.get({ plain: true }));
	});
};

exports.insert = function(req, res, next) {
	models.campaign
		.build(req.body)
		.save()
		.then(function(campaign) {
    	res.status(201).json({ success: true });
		})
		.catch(function(err){
			return next(err);
		});
};

exports.update = function(req, res, next) {
  var request = req.body;
	models.campaign
		.update({
			title: request.title,
			location: request.location,
			passPhrase: request.passPhrase,
			round: request.round
		}, {
			where: { id: request.id }
		})
		.then(function (campaign) {
    	res.status(200).send({ success: true });
		})
		.catch(function(err){
			return next(err);
		});
};
