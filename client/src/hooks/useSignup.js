import apiClient from "../services/apiClient";

export const useSignup = () => {
  const signup = async ({ email, password }) => {
    console.log(`email: ${email}, password: ${password}`);
    try {
      const response = await apiClient.post("/api/v1/auth/signup", {
        email,
        password,
      });
      const data = response.data;
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
