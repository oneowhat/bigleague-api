"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Campaign = sequelize.define('campaign', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    passPhrase: {
      type: Sequelize.STRING
    },
    round: {
      type: Sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        Campaign.belongsTo(models.user);
        Campaign.hasMany(models.coach);
        Campaign.hasMany(models.match);
      }
    }
  });

  return Campaign;
}
