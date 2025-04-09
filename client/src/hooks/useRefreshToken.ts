import axios from "@/api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = function () {
  const { setAuth, logout } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      setAuth((prev) => {
        console.log({ responseRefresh: response });
        return { ...prev, accessToken: response.data?.accessToken };
      });

      return response?.data?.accessToken;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      logout();
    }
  };

  return refresh;
};
