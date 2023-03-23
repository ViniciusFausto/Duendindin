import express from "express";import { verifyToken } from '../config/jwt.mjs'
import { getAllExpensesFromUser, getAllExpenses, getExpense, getAllExpensesFromCategory, getExpenseFromCategory, updateExpense, deleteExpense, createExpense, updateExpensePaid } from "../controller/ExpenseController.mjs";

const router = express.Router();

/**
 * @swagger
 * /expense:
 *   get:
 *     tags: ['Expense']
 *     summary: Retrieve all Duendindin expenses
 *     description: Retrieve all Duendindin expenses
 *     responses:
 *       200:
 *         description: All expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
router.get('/', verifyToken, getAllExpenses)


/**
 * @swagger
 * /expense/{id}:
 *   get:
 *     tags: ['Expense']
 *     summary: Retrieve a single Duendindin expense
 *     description: Retrieve a single Duendindin expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the expense
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/:id', verifyToken, getExpense)

/**
 * @swagger
 * /expense/category/{idCategoria}:
 *   get:
 *     tags: ['Expense']
 *     summary: Retrieve a single Duendindin expense with category
 *     description: Retrieve a single Duendindin expense with category
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         description: Numeric ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     idCategoria:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/category/:idCategoria', verifyToken, getAllExpensesFromCategory)

/**
 * @swagger
 * /expense/user/{idUsuario}:
 *   get:
 *     tags: ['Expense']
 *     summary: Retrieve a single Duendindin user.
 *     description: Retrieve a single Duendindin user.
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: Numeric ID User of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     idUsuario:
 *                       type: integer
 *                       description: The user ID User.
 *                       example: 0
*/
router.get('/user/:idUsuario', verifyToken, getAllExpensesFromUser)

/**
 * @swagger
 * /expense/{id}/{idCategoria}:
 *   get:
 *     tags: ['Expense']
 *     summary: Retrieve all Duendindin expense of category with user
 *     description: Retrieve all Duendindin expense of category with user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the expense
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         description: Numeric ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All expense 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     idCategoria:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/:id/:idCategoria', verifyToken, getExpenseFromCategory)

router.patch('/paid/:id', verifyToken, updateExpensePaid)

/**
 * @swagger
 * /expense/{id}:
 *    patch:
 *      tags: ['Expense']
 *      summary: Update a expense
 *      description: Update a expense
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the expense
 *            schema:
 *              type: integer
 *          - in: body
 *            name: expense
 *            schema:
 *               $ref: '#/definitions/UpdateExpense'
 *      responses:
 *          200:
 *              description: A update expense
*/
router.patch('/:id', verifyToken, updateExpense)

/**
 * @swagger
 * /expense/{id}:
 *    delete:
 *      tags: ['Expense']
 *      summary: Delete a expense
 *      description: Delete a expense
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the expense
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A delete expense
*/
router.delete('/:id', verifyToken, deleteExpense)

/**
 * @swagger
 * /expense:
 *    post:
 *      tags: ['Expense']
 *      summary: Create a expense
 *      description: Create a expense
 *      parameters:
 *          - in: body
 *            name: expense
 *            schema:
 *               $ref: '#/definitions/CreateExpense'
 *      responses:
 *          200:
 *              description: A create expense
*/
router.post('/', verifyToken, createExpense)

export const expenseRoutes = router