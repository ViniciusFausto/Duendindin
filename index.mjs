import express from 'express'
import 'dotenv/config'
import { categoryRoutes } from './src/routes/CategoryRoutes.mjs'
import { expenseRoutes } from './src/routes/ExpenseRoutes.mjs'
import { gainRoutes } from './src/routes/GainRoutes.mjs'
import { settingRoutes } from './src/routes/SettingRoutes.mjs'
import { chartsRoutes } from './src/routes/ChartsRoutes.mjs'
import { userRoutes } from './src/routes/UserRoutes.mjs'
import { User } from './src/model/User.mjs'
import { Setting } from './src/model/Setting.mjs'
import { Gain } from './src/model/Gain.mjs'
import { Expense } from './src/model/Expense.mjs'
import { Category } from './src/model/Category.mjs'
import cors from 'cors';
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"


const app = express()
const port = 3000

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors())

app.use("/user",userRoutes)
app.use('/category', categoryRoutes)
app.use('/expense',expenseRoutes)
app.use('/gain',gainRoutes)
app.use('/setting', settingRoutes)
app.use('/charts', chartsRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ mensagem: err.message });
    return;
});

Category.belongsTo(User, {
    foreignKey: 'usuarioID'
})

Category.hasMany(Gain, {
    foreignKey: 'id'
})

Category.hasMany(Expense, {
    foreignKey: 'id'
})

User.hasOne(Setting, {
    foreignKey: 'usuarioID'
})

Setting.belongsTo(User, {
    foreignKey: 'usuarioID'
})
Gain.belongsTo(Category, {
    foreignKey: 'categoriaID'
})
Expense.belongsTo(Category, {
    foreignKey: 'categoriaID'
})

app.listen(port, () => console.log(`API listening on port ${port}!`))


//Swagger config
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Duendindin API",
            description: "Duendindin API information",
            contact: {
                name: "Amazing Developer"
            },
            servers: [
                "http://localhost:3000/v1"
            ]
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'x-access-token',
                scheme: 'bearer',
                in: 'header',
            },
        },
        security: [{ bearerAuth: [] }],
        tags: [
            {
                name: "User",
                description: "Endpoints User"
            },
            {
                name: "Category",
                description: "Endpoints Category"
            },
            {
                name: "Expense",
                description: "Endpoints Expense"
            },
            {
                name: "Gain",
                description: "Endpoints Gain"
            },
            {
                name: "Setting",
                description: "Endpoints Setting"
            }
        ],
    },
    apis: [
        './src/routes/UserRoutes.mjs',
        './src/routes/CategoryRoutes.mjs',
        './src/routes/ExpenseRoutes.mjs',
        './src/routes/GainRoutes.mjs',
        './src/routes/SettingRoutes.mjs',
        './src/documentation/models.js'
    ]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
