import axios from "axios";

export const useSignup = () => {
  const signup = async ({ email, password }) => {
    console.log(`email: ${email}, password: ${password}`);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/signup`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      console.log(`data: ${JSON.stringify(data)}`);
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(`data.message: ${data.message}`);
      return data;
    } catch (error) {
      console.error("Error in signup", error);
    }
  };
  return signup;
};
