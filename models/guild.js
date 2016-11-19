"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Guild = sequelize.define('guild', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        Guild.hasMany(models.player);
        Guild.hasMany(models.plot);
      }
    }
  });

  return Guild;
}
