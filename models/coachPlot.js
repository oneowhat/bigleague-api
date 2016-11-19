"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var CoachPlot = sequelize.define('coachPlot', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        CoachPlot.belongsTo(models.coach);
        CoachPlot.belongsTo(models.plot);
      }
    }
  });

  return CoachPlot;
}
