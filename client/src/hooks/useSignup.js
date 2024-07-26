export const useSignup = () => {
  const signup = async ({ email, password }) => {
    console.log(`email: ${email}, password: ${password}`);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(`data: ${data}`);
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(`data.message: ${data.message}`);
      return data.message;
    } catch (error) {
      console.error("Error in signup", error);
    }
  };
  return signup;
};
