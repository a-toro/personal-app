import axios from "@/api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = function () {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log({ response });
      return { ...prev, accessToken: response.data?.accessToken };
    });

    return response?.data?.accessToken;
  };

  return refresh;
};
