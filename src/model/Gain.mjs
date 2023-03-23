import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Gain = dbConfig.define(
    "ganho",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoriaID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(100)
        },
        data: {
            type: DataTypes.DATEONLY
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2)
        },
        descricao: {
            type: DataTypes.STRING(256)
        },
        recorrente: {
            type: DataTypes.BOOLEAN
        },
        tipo: {
            type: DataTypes.STRING(3)
        }
    },
    { freezeTableName: true, timestamps: false }
)