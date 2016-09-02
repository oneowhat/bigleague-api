'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('matches', 'round');
    queryInterface.addColumn(
      'matches',
      'roundId', {
        type: Sequelize.INTEGER,
        references: {
            model: 'rounds',
            key: 'id'
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('matches', 'roundId');
    queryInterface.addColumn(
      'matches',
      'round', {
        type: Sequelize.INTEGER
      });
  }
};
