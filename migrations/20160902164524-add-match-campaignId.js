'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'matches',
      'campaignId', {
        type: Sequelize.INTEGER,
        references: {
            model: 'campaigns',
            key: 'id'
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('matches', 'campaignId');
  }
};
