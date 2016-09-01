"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
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
    admin: {
      type: Sequelize.BOOLEAN
    },
    salt: {
      type: Sequelize.STRING
    },
    hashedPassword: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.campaign);
        User.hasMany(models.coach);
      }
    }
  });

  return User;
}
