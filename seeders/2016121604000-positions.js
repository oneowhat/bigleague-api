'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positions', [
      { name: "Captain" },
      { name: "Mascot" },
      { name: "Player" }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
