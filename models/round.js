"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Round = sequelize.define('round', {
      roundNumber: {
        type: Sequelize.INTEGER
      },
      completedAt: {
        type: Sequelize.DATE
      }
  }, {
    classMethods: {
      associate: function(models) {
        Round.belongsTo(models.campaign);
        Round.hasMany(models.match);
      }
    }
  });

  return Round;
}
