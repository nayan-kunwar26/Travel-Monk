import apiClient from "../services/apiClient";

export const useLogin = () => {
  const login = async ({email, password}) => {
    try {
      const response = await apiClient.post("/api/v1/auth/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.error("Error in login", error);
    }
  };

  return login;
};
