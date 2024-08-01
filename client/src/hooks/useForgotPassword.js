import apiClient from "../services/apiClient";

export const useForgotPassword = () => {
  const forgotPassword = async (email) => {
    try {
      const response = await apiClient.post("/api/v1/user/forgot-password", {
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Error in forgot password", error);
    }
  };
  return forgotPassword;
};
