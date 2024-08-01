import React, { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPassword = useForgotPassword();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(email);
    } catch (error) {
      console.error("Forgot Password failed", error);
    }
  };
  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
