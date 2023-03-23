'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('configuracao', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      usuarioID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      renda_fixa: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
      },
      limite_lazer: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
      },
      limite_contas: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
      },
      limite_investimento: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('configuracao');
  }
};
