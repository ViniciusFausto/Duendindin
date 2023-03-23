import express from "express";
import { verifyToken } from '../config/jwt.mjs';
import {updateSetting, getAllSettingFromUser, getAllSettings} from "../controller/SettingController.mjs";

const router = express.Router();

export const settingRoutes = router

/**
 * @swagger
 * /setting/{id}:
 *    patch:
 *      tags: ['Setting']
 *      summary: Update a setting
 *      description: Update a setting information
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the setting.
 *            schema:
 *               type: integer
 *          - in: body
 *            name: login
 *            schema:
 *               $ref: '#/definitions/UpdateSetting'
 *      responses:
 *          201:
 *              description: A update setting
*/
router.patch('/:id', verifyToken, updateSetting);

/**
 * @swagger
 * /setting/{userId}:
 *   get:
 *     tags: ['Setting']
 *     summary: Retrieve all Duendindin settings of user.
 *     description: Retrieve all Duendindin settings of user.
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
router.get('/:userId', verifyToken, getAllSettingFromUser)

/**
 * @swagger
 * /setting:
 *   get:
 *     tags: ['Setting']
 *     summary: Retrieve all Duendindin settings
 *     description: Retrieve all Duendindin settings
 *     responses:
 *       200:
 *         description: All user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
router.get('/', verifyToken, getAllSettings)