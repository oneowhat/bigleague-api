"use strict";

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
    }
  }, {
    classMethods: {
      associate: function(models) {
        Match.balongsTo(models.Coach);
      }
    }
  });

  return User;
}
