'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categoria', [{
      usuarioID: 1,
      nome: 'Balada',
      descricao: 'Gastei com balada e energético'
      // gasto_fixo: false,
      // ganho_fixo: false,
      // gasto_variavel: true,
      // ganho_variavel: false,
      // valor: 0.00
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categoria', null, {});
  }
};