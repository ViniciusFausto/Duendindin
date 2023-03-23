import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const User = dbConfig.define(
    "usuario",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(100)
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true
        },
        senha: {
            type: DataTypes.STRING(256)
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
        },
        cep: {
            type: DataTypes.STRING(10)
        },
        cidade: {
            type: DataTypes.STRING(50)
        },
        estado: {
            type: DataTypes.CHAR(4)
        },
        ativo: {
            type: DataTypes.BOOLEAN
        }
    },
    { freezeTableName: true, timestamps: false }
)

