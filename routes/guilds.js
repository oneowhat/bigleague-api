var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["guilds", "models"]);
	
exports.find = function(req, res, next) {
	db.guilds.find(function(err, guilds){
    if(err) return next(err);
		res.json(guilds);
	})
};

exports.byName = function(req, res, next) {
	db.guilds.findOne({ name: req.params.guild }, function(err, guild){
    if(err) return next(err);
    if(guild) {
      db.models.find({ guild: req.params.guild }, function(err, models) {
        if(err) return next(err);
        res.json({
          guild: guild,
          models: models
        });
      });
    }
	})
};

exports.insert = function(req, res, next) {
  db.guilds.insert(req.body, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};