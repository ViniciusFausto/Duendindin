'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('categoria', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      usuarioID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      nome: {
        type: Sequelize.DataTypes.STRING(100)
      },
      descricao: {
        type: Sequelize.DataTypes.STRING(256)
      }
      // gasto_fixo: {
      //   type: Sequelize.DataTypes.DECIMAL(10, 2)
      // },
      // ganho_fixo: {
      //   type: Sequelize.DataTypes.DECIMAL(10, 2)
      // },
      // gasto_variavel: {
      //   type: Sequelize.DataTypes.DECIMAL(10, 2)
      // },
      // ganho_variavel: {
      //   type: Sequelize.DataTypes.DECIMAL(10, 2)
      // },
      // valor: {
      //   type: Sequelize.DataTypes.DECIMAL(10, 2)
      // }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('categoria');
  }
};
