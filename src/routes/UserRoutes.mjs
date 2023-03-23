import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, inactivatedUser, updateUser, getUserById, getAllUsers, login, getUsersWithTheirsSettingsById, updateUserPassword} from "../controller/UserController.mjs";
const router = express.Router();

/**
 * @swagger
 * /user:
 *    post:
 *      tags: ['User']
 *      summary: Create a user.
 *      description: Create a user.
 *      parameters:
 *          - in: body
 *            name: login
 *            schema:
 *               $ref: '#/definitions/CreateUser'
 *      responses:
 *          201:
 *              description: A create user.
*/
router.post('/', createUser);

/**
 * @swagger
 * /user/{id}/Status:
 *   patch:
 *     tags: ['User']
 *     summary: Update status inactivate the user.
 *     description: Update status inactivate the user.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID of the user to retrieve.
 *           schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: A update inactived user.
*/
router.patch('/:id/Status', verifyToken, inactivatedUser);

/**
 * @swagger
 * /user/full/{id}:
 *   patch:
 *     tags: ['User']
 *     summary: Update user information.
 *     description: Update user information.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID of the user.
 *           schema:
 *              type: integer
 *         - in: body
 *           name: updateUser
 *           schema:
 *              $ref: '#/definitions/UpdateUser'
 *     responses:
 *       200:
 *         description: A update user.
*/
router.patch('/full/:id', verifyToken, updateUser);

/**
 * @swagger
 * /user/full/{id}:
 *   put:
 *     tags: ['User']
 *     summary: Update all user information.
 *     description: Update all user information.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID of the user.
 *           schema:
 *              type: integer
 *         - in: body
 *           name: updateUser
 *           schema:
 *              $ref: '#/definitions/UpdateUser'
 *     responses:
 *       200:
 *         description: A update all user .
*/
router.put('/full/:id', verifyToken, updateUser);

/**
 * @swagger
 * /user:
 *   patch:
 *     tags: ['User']
 *     summary: Update user password.
 *     description: Update user password.
 *     parameters:
 *         - in: body
 *           name: updatePasswordUser
 *           schema:
 *              $ref: '#/definitions/UpdatePasswordUser'
 *     responses:
 *       200:
 *         description: A update password user.
*/
router.patch('/', updateUserPassword);

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     tags: ['User']
 *     summary: Retrieve all Duendindin users.
 *     description: Retrieve all single Duendindin users.
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
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/getAll', verifyToken, getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: ['User']
 *     summary: Retrieve a single Duendindin user.
 *     description: Retrieve a single Duendindin user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
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
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/:id', verifyToken, getUserById);


/**
 * @swagger
 * /user/getSettings/{id}:
 *   get:
 *     tags: ['User']
 *     summary: Retrieve a setting Duendindin user.
 *     description: Retrieve a setting Duendindin user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A setting user.
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
router.get('/getSettings/:id', verifyToken, getUsersWithTheirsSettingsById);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: ['User']
 *     summary: Retrieve a JWT user.
 *     description: Retrieve a JWT user.
 *     parameters:
 *         - in: body
 *           name: login
 *           schema:
 *              $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: A JWT user.
*/
router.post('/login', login);

export const userRoutes = router


