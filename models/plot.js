"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Plot = sequelize.define('plot', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    season: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    rarity: {
      type: Sequelize.STRING
    },
    availability: {
      type: Sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        Plot.belongsTo(models.guild);
      }
    }
  });

  return Plot;
}
