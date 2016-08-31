"use strict";

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
        User.hasMany(models.Campaign);
        User.hasMany(models.Coach);
      }
    }
  });

  return User;
}
