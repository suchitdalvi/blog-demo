import { useCallback, useEffect, useState } from "react";
import { Api } from "../models/api.interface";

export function useFetch(param: Api | null) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(async (fetchParams: Api) => {
    try {
      setLoading(true);
      const response = await fetch(fetchParams?.url || "", {
        method: fetchParams?.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fetchParams?.optionBody),
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError("custom error");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (param !== null) callApi(param);
  }, [param, callApi]);

  return { data, loading, error };
}
