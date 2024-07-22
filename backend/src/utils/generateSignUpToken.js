import jwt from "jsonwebtoken";

export const generateSignUpToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
  return token;
};
