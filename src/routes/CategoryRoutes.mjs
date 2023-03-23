import express from "express";
import { verifyToken } from '../config/jwt.mjs'
import { createCategory, getUserCategory, getAllUserCategories, getAllSystemCategories, updateCategory, deleteCategory } from '../controller/CategoryController.mjs'

const router = express.Router();

/**
 * @swagger
 * /category:
 *    post:
 *      tags: ['Category']
 *      summary: Create a category of user
 *      description: Create a category of user
 *      parameters:
 *          - in: body
 *            name: category
 *            schema:
 *               $ref: '#/definitions/CreateCategory'
 *      responses:
 *          201:
 *              description: A create category
*/
router.post('/', verifyToken, createCategory) //

/**
 * @swagger
 * /category/{userId}/{id}:
 *    patch:
 *      tags: ['Category']
 *      summary: Update a category
 *      description: Update a category of user
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description: Numeric ID of the user
 *            schema:
 *               type: integer
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the category
 *            schema:
 *               type: integer
 *          - in: body
 *            name: category
 *            schema:
 *               $ref: '#/definitions/UpdateCategory'
 *      responses:
 *          201:
 *              description: A update user
*/
router.patch('/:userId/:id', verifyToken, updateCategory) //

/**
 * @swagger
 * /category/{userId}/{id}:
 *    delete:
 *      tags: ['Category']
 *      summary: Delete a category
 *      description: Delete a category of user
 *      parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category
 *         schema:
 *           type: integer
 *      responses:
 *          201:
 *              description: A delete category
*/
router.delete('/:userId/:id', verifyToken, deleteCategory)

/**
 * @swagger
 * /category/all:
 *   get:
 *     tags: ['Category']
 *     summary: Retrieve all system Duendindin categories
 *     description: Retrieve all system Duendindin categories
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
router.get('/all', verifyToken, getAllSystemCategories) 

/**
 * @swagger
 * /category/all/{userId}:
 *   get:
 *     tags: ['Category']
 *     summary: Retrieve all Duendindin categories of user.
 *     description: Retrieve all Duendindin categories of user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user.
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
 *                     userId:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/all/:userId', verifyToken, getAllUserCategories) //

/**
 * @swagger
 * /category/{userId}/{id}:
 *   get:
 *     tags: ['Category']
 *     summary: Retrieve a single Duendindin category of user.
 *     description: Retrieve a single Duendindin category of user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category.
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
 *                     userId:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/:userId/:id', verifyToken, getUserCategory) //

export const categoryRoutes = router