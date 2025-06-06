import { useEffect, useState } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async function () {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get(url, {
          signal: controller.signal,
        });

        if (response.status !== 200) {
          throw response;
        }

        setData(response.data.data);
        setIsError(false);
      } catch (error) {
        console.log({ error });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, axiosPrivate]);

  return { isError, isLoading, data };
}
