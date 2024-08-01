import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../../controllers/user/userController.js";

const router = express.Router();

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router;
