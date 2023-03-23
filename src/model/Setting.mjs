import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Setting = dbConfig.define(
    "configuracao",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        usuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        renda_fixa: {
            type: DataTypes.DECIMAL(10, 2)
        },
        limite_lazer: {
            type: DataTypes.DECIMAL(10, 2)
        },
        limite_contas: {
            type: DataTypes.DECIMAL(10, 2)
        },
        limite_investimento: {
            type: DataTypes.DECIMAL(10, 2)
        }
    },
    { freezeTableName: true, timestamps: false }
)