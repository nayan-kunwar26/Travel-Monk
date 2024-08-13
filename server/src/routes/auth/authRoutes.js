import express from "express";
import {
  signUp,
  login,
  logout,
  verifySignUpToken,
} from "../../controllers/auth/authController.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(authenticateToken, logout);

router.route("/verify-signup/:token").get(verifySignUpToken);

export default router;
