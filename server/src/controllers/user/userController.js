import User from "../../models/user/user.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ApiErrorResponse from "../../utils/errors/ApiErrorResponse.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ApiErrorResponse("Email is required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) return next(new ApiErrorResponse("No user found!!", 400));
  const resetToken = jwt.sign(
    { userId: existingUser._id, email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: process.env.NODEMAILER_EMAIL_PASS, // App-specific password generated from Google Account
    },
  });

  // Define email options
  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL_USER,
    to: email,
    subject: "Password Reset Rquest",
    html: `<p>You requested a password reset</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return res
        .status(200)
        .json({ message: "Password reset mail sent successfuly" });
    }
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!password) {
    return next(new ApiErrorResponse("Password is required!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return next(new ApiErrorResponse("Invalid token!", 400));
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new ApiErrorResponse("User not found!", 401));
  }
  user.password = password;
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully." });
});
