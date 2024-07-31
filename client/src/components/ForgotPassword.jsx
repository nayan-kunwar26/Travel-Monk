import React from "react";

const ForgetPassword = () => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <input
          type="email"
          value=""
          onChange=""
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
