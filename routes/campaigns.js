var models = require('../models');

exports.byUser = function(req, res, next) {
	models.Campaign.findAll({
		where: {
			longshanksId: req.params.userId
		}
	}).then(function(campaign){
		res.json(campaigns);
	});
};

exports.byTitle = function(req, res, next) {
	models.Campaign.findOne({
		where: {
			title: req.params.title
		}
	}).then(function(campaign){
		res.json(campaign);
	});
};

exports.insert = function(req, res, next) {
	models.Campaign
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
	models.Campaign
		.findById(request.id)
		.then(function (campaign) {
			campaign.update({
        title: request.title,
        location: request.location,
        passphrase: request.passphrase
			})
			.then(function() {
	    	res.status(200).send({ success: true });
			});
		});
};
