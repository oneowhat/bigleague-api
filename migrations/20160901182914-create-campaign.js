'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('campaign', {
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
      },
      longshanks_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('campaign');
  }
};
