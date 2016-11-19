"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var MatchResult = sequelize.define('matchResult', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    victoryPoints: {
      type: Sequelize.INTEGER
    },
    leaguePoints: {
      type: Sequelize.INTEGER
    },
    campaignPoints: {
      type: Sequelize.INTEGER
    },
    favoursSpent: {
      type: Sequelize.INTEGER
    },
    favoursGained: {
      type: Sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        MatchResult.belongsTo(models.coach);
        MatchResult.belongsTo(models.match);
      }
    }
  });

  return MatchResult;
}
