var models = require('../models');

exports.all = function(req, res, next) {
  models.guild.findAll()
    .then(function(guilds) {
      res.json(guilds.map(function(guild) {
				return guild.get({ plain: true });
			}));
    });
};

exports.byId = function(req, res, next) {
  models.guild
    .findById(req.params.id, { include: [{ model: models.player }] })
    .then(function(guild) {
    	res.json(guild.get({ plain: true }));
    });
};
