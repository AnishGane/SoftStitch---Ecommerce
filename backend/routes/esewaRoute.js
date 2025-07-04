import express from "express";
import { generateEsewaSignature } from "../controllers/esewaController.js";
const router = express.Router();

router.post("/signature", generateEsewaSignature);

export default router;
