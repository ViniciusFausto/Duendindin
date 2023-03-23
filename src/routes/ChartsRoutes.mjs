import express from "express";
import { verifyToken } from '../config/jwt.mjs';
import { getChart1, getChart2, getChart3, getChart4 } from "../controller/ChartsController.mjs";

const router = express.Router();

export const settingRoutes = router

router.post('/1', verifyToken, getChart1);

router.post('/2', verifyToken, getChart2)

router.post('/3', verifyToken, getChart3)

router.post('/4', verifyToken, getChart4)

export const chartsRoutes = router