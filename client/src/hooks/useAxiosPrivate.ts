import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";
import { axiosPrivate } from "@/api/axios";
import { JWT_SCHEMA } from "@/lib/constants";

export const useAxiosPrivate = function () {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `${JWT_SCHEMA} ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers[
            "Authorization"
          ] = `${JWT_SCHEMA} ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return axiosPrivate;
};
