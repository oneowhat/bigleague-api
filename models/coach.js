"use strict";

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
        Coach.belongsTo(models.Campaign);
        Coach.hasMany(models.Match, { as: 'homeCoach', foreignKey: 'homeCoachId' });
        Coach.hasMany(models.Match, { as: 'awayCoach', foreignKey: 'awayCoachId' });
      }
    }
  });

  return User;
}
