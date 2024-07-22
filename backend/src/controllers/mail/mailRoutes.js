import jwt from "jsonwebtoken";
import User from "../../models/user/user.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";
export const verifySignUpToken = asyncHandler(async (req, res) => {
  try {
    const token = req.body;
    const decodedToken = jwt.sign(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return next(
        new ErrorResponse("Email is not verified or Invalid token", 400)
      );
    }
    const { payload } = decodedToken;
    let user = new User({ 
      name: payload.name,
      email: payload.email,
      password: payload.password,
      isVerified: true,
    });

    await user.save(); 
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    next(new ErrorResponse(`Internal Server Error! ${error.message}`, 500));
  }
});
