'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [{
      nome: 'Jorge',
      email: 'jorge@email.com',
      senha: '123456',
      data_nascimento: new Date(),
      cep:"12345-678",
      cidade: 'São Paulo',
      estado: 'SP',
      ativo: true
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
