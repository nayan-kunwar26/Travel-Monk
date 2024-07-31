import express from "express";
import { forgotPassword } from "../../controllers/user/userController.js";

const router = express.Router();

router.route("/forgot-password").post(forgotPassword);

export default router;
