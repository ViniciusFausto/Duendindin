import express from "express";
import { verifyToken } from '../config/jwt.mjs'
import { getAllEarningsFromUser, getAllEarnings, getGain, getAllEarningsFromCategory, getGainFromCategory, updateGain, deleteGain, createGain } from "../controller/GainController.mjs";

const router = express.Router();

/**
 * @swagger
 * /gain:
 *   get:
 *     tags: ['Gain']
 *     summary: Retrieve all Duendindin gain
 *     description: Retrieve all Duendindin gain
 *     responses:
 *       200:
 *         description: All gain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
router.get('/', verifyToken, getAllEarnings)

/**
 * @swagger
 * /gain/{id}:
 *   get:
 *     tags: ['Gain']
 *     summary: Retrieve a single Duendindin gain
 *     description: Retrieve a single Duendindin gain
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the gain
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single gain
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
router.get('/:id', verifyToken, getGain)

/**
 * @swagger
 * /gain/category/{idCategoria}:
 *   get:
 *     tags: ['Gain']
 *     summary: Retrieve a single Duendindin gain with category
 *     description: Retrieve a single Duendindin gain with category
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         description: Numeric ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single gain
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
router.get('/category/:idCategoria', verifyToken, getAllEarningsFromCategory)

/**
 * @swagger
 * /gain/user/{idUsuario}:
 *   get:
 *     tags: ['Gain']
 *     summary: Retrieve a single Duendindin gain of user
 *     description: Retrieve a single Duendindin gain of user
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: Numeric ID User of the user
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
router.get('/user/:idUsuario', verifyToken, getAllEarningsFromUser)

/**
 * @swagger
 * /gain/{id}/{idCategoria}:
 *   get:
 *     tags: ['Gain']
 *     summary: Retrieve all Duendindin gain of category with user
 *     description: Retrieve all Duendindin gain of category with user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the gain
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
 *         description: All gain
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
router.get('/:id/:idCategoria', verifyToken, getGainFromCategory)

/**
 * @swagger
 * /gain/{id}:
 *    patch:
 *      tags: ['Gain']
 *      summary: Update a gain
 *      description: Update a gain
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the gain
 *            schema:
 *              type: integer
 *          - in: body
 *            name: gain
 *            schema:
 *               $ref: '#/definitions/UpdateGain'
 *      responses:
 *          200:
 *              description: A update gain
*/
router.patch('/:id', verifyToken, updateGain)

/**
 * @swagger
 * /gain/{id}:
 *    delete:
 *      tags: ['Gain']
 *      summary: Delete a gain
 *      description: Delete a gain
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the gain
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A delete gain
*/
router.delete('/:id', verifyToken, deleteGain)

/**
 * @swagger
 * /gain:
 *    post:
 *      tags: ['Gain']
 *      summary: Create a gain
 *      description: Create a gain
 *      parameters:
 *          - in: body
 *            name: gain
 *            schema:
 *               $ref: '#/definitions/CreateGain'
 *      responses:
 *          200:
 *              description: A create gain
*/
router.post('/', verifyToken, createGain)

export const gainRoutes = router