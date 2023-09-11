import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

//custom hook
//we can acall a;i in any other component by fetchDataFromApi and by useFetch also but useFetch is more
// approriate bcoz by this we can call api as wella s maintain the states too

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
