"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define('match', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    round: {
      type: Sequelize.INTEGER
    },
    homeScore: {
      type: Sequelize.INTEGER
    },
    awayScore: {
      type: Sequelize.INTEGER
    },
    reported: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Match.belongsTo(models.coach);
        Match.belongsTo(models.campaign);
      }
    }
  });

  return Match;
}
