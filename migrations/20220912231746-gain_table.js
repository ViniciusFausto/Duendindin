'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ganho', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      categoriaID: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
      },
      nome: {
        type: Sequelize.DataTypes.STRING(100)
      },
      data: {
        type: Sequelize.DataTypes.DATEONLY
      },
      valor: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
      },
      descricao: {
        type: Sequelize.DataTypes.STRING(256)
      },
      recorrente: {
        type: Sequelize.DataTypes.BOOLEAN
      },
      tipo: {
        type: Sequelize.DataTypes.STRING(3)
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ganho');
  }
};
