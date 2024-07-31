import React from "react";

const ResetPassword = () => {
  return (
    <div>
      <h2>Reset Password</h2>
      <form >
        <input
          type="password"
          value=""
          // onChange=""
          placeholder="Enter new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
