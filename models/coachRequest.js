"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Coach = sequelize.define('coachRequest', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    firstChoiceGuildId: {
      type: Sequelize.INTEGER
    },
    secondChoiceGuildId: {
      type: Sequelize.INTEGER
    },
    thirdChoiceGuildId: {
      type: Sequelize.INTEGER
    },
    paid: {
      type: Sequelize.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        Coach.belongsTo(models.campaign);
      }
    }
  });

  return Coach;
}
