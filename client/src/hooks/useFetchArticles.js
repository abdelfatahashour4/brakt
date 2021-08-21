import {useEffect, useState} from "react";
import {apiAxios} from "../utilities/axios";

export default function useFetch(method, url, category, tag, params) {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      setApiData([]);
      setError(true);
      
      await apiAxios({
        method: method,
        url: `/v1${url}${`?category=${category || "All"}`}&${`tags=${
          tag || "All"
        }`}`,
        params: {
          ...params,
        },
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
      return;
    };
  }, [method, url, category, tag, params]);

  return {
    loading,
    apiData,
    error,
  };
}
