import sequelize from "sequelize";
import 'dotenv/config'

export const dbConfig = new sequelize(
    'duendindindb',
    'root',
    'rootroot',
    {
        dialect: 'mysql',
        host: 'database-duendindin.chpmo6n1affu.us-east-2.rds.amazonaws.com',
        logging: true
    }
)