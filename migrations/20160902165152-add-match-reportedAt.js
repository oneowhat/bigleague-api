'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'matches',
      'reportedAt', {
        type: Sequelize.DATE,
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('matches', 'reportedAt');
  }
};
