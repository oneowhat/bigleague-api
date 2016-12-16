var models = require('../models');

exports.all = function(req, res, next) {
  models.guilds.findAll()
    .then(function(guilds) {
      res.json(guilds.map(function(guild) {
				return guild.get({ plain: true });
			}));
    });
}
