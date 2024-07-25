import User from "../../models/user/user.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ErrorResponse from "../../utils/errors/errorResponse.js";
import { generateSignUpToken } from "../../utils/generateSignUpToken.js";
import { sendMail } from "../../utils/Mail/sendMail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//SignUp controller
export const signUp = asyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorResponse("User already exists!", 400));

  const signUpToken = generateSignUpToken({ email, password });
  const verificationUrl = `http://localhost:5000/api/v1/mail/verifySignupToken/${signUpToken}`;

  sendMail(email, verificationUrl)
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Mail sent successfully" });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: `Unable to send mail! ${error.message}`,
      });
    });
});

// Login controller
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) return next(new ErrorResponse("No user found!!", 400));

  const isValidPassword = await bcrypt.compare(
    password,
    existingUser?.password
  );

  if (!isValidPassword) return next(new ErrorResponse("Wrong password!!", 400));

  // Generate Access Token
  const accessToken = jwt.sign(
    { userId: existingUser?._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  console.log(`accessToken: ${accessToken}`);

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { userId: existingUser?._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  console.log(`refreshToken: ${refreshToken}`);

  res
    .cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      expires: new Date(Date.now() + 15 * 60 * 1000), //15m
    })
    .cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), //15d
    })
    .status(200)
    .json({ success: true, message: "Logged in successfully!!" });
});

//Logout controller
export const logout = asyncHandler((req, res, next) => {
  res
    .cookie("access-token", "", { maxAge: 0 })
    .cookie("refresh-token", "", { maxAge: 0 })
    .status(200)
    .json({ success: true, message: "Logout successfully!!" });
});
