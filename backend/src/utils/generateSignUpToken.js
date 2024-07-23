import jwt from "jsonwebtoken";

export const generateSignUpToken = (payload) => {
  const email = payload;
  console.log(`email: ${email}`);
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });
  console.log(`token: ${token}`);
  return token; 
};
