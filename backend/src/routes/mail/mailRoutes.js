import express from "express";
import { verifySignUpToken } from "../../controllers/mail/mailRoutes.js";

const router = express.Router();

router.route("/verifySignupToken/:token").post(verifySignUpToken);

export default router;
