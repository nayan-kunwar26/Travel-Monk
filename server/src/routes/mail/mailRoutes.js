import express from "express";
import { verifySignUpToken } from "../../controllers/mail/mailController.js";

const router = express.Router();

router.route("/verifySignupToken/:token").get(verifySignUpToken);

export default router;
