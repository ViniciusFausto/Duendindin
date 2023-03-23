'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('configuracao', [{
      usuarioID: 1,
      renda_fixa: 123.45,
      limite_lazer: 12.00,
      limite_contas: 45.00,
      limite_investimento: 30.00
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('configuracao', null, {});
  }
};
