'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('usuario', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      nome: {
        type: Sequelize.DataTypes.STRING(100)
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true
      },
      senha: {
        type: Sequelize.DataTypes.STRING(256)
      },
      data_nascimento: {
        type: Sequelize.DataTypes.DATEONLY,
      },
      cep: {
        type: Sequelize.DataTypes.STRING(10)
      },
      cidade: {
        type: Sequelize.DataTypes.STRING(50)
      },
      estado: {
        type: Sequelize.DataTypes.CHAR(4)
      },
      ativo: {
        type: Sequelize.DataTypes.BOOLEAN
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('usuario');
  }
};
