"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define('match', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    homeScore: {
      type: Sequelize.INTEGER
    },
    awayScore: {
      type: Sequelize.INTEGER
    },
    reportedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Match.belongsTo(models.coach);
        Match.belongsTo(models.round);
        Match.hasMany(models.matchResult);
      }
    }
  });

  return Match;
}
