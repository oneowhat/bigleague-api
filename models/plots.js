"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Plot = sequelize.define('plot', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Plot.belongsTo(models.coach);
      }
    }
  });

  return Plot;
}
