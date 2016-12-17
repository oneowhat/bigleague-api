'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('position', [
      { name: "Captain" },
      { name: "Mascot" },
      { name: "Player" }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('position', null, {});
  }
};
