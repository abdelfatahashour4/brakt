import {useEffect, useState} from "react";
import {apiAxios} from "../utilities/axios";

export default function useFetch(method, url, category, tag, params, page) {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);

      await apiAxios({
        method: method,
        url: `/v1${url}${`?category=${category || "All"}`}&${`tags=${
          tag || "All"
        }`}&${`page=${page || 1}`}`,
        params: params
          ? {
              ...params,
            }
          : {},
      })
        .then(({data}) => {
          setLoading(false);
          setApiData(data.message);
          setError(false);
        })
        .catch(error => {
          setLoading(false);
          setApiData([]);
          setError(true);
        });
    };

    handleFetch();

    // clean up
    return () => {
      setLoading(false);
      setApiData([]);
      setError(false);
    };
  }, [method, url, category, tag, params, page]);

  return {
    loading,
    apiData,
    error,
  };
}
