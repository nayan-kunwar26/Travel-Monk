import jwt from "jsonwebtoken";
import User from "../../models/user/user.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ErrorResponse from "../../utils/errors/errorResponse.js";

export const verifySignUpToken = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;
    console.log(`token: ${token}`);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return next(
        new ErrorResponse("Email is not verified or Invalid token", 400)
      );
    }
    const { email, password } = decodedToken;
    let user = new User({
      email,
      password,
    });

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    next(new ErrorResponse(`Internal Server Error! ${error.message}`, 500));
  }
});
