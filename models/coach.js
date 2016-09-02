"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Coach = sequelize.define('coach', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    guild: {
      type: Sequelize.STRING
    },
    campaignPoints: {
      type: Sequelize.INTEGER
    },
    leaguePoints: {
      type: Sequelize.INTEGER
    },
    favours: {
      type: Sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        Coach.belongsTo(models.campaign);
        Coach.hasMany(models.match, { as: 'homeCoach', foreignKey: 'homeCoachId' });
        Coach.hasMany(models.match, { as: 'awayCoach', foreignKey: 'awayCoachId' });
        Coach.hasMany(models.plot);
      }
    }
  });

  return Coach;
}
