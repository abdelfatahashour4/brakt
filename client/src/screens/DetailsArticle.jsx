import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiAxios} from "../utilities/axios";

export default function DetailsArticle() {
  const params = useParams();
  const [article, setArticle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log("article ", article);
  console.log("loading ", loading);
  console.log("error ", error);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      await apiAxios
        .get("/v1/article/articleId", {
          params: {
            articleId: params.articleId,
          },
        })
        .then(({data}) => {
          setLoading(false);
          setArticle(data.message);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }

    fetchArticle();

    return () => {
      setArticle(false);
    };
  }, [params.articleId]);

  return <div>article Details {params.articleId.toString()} </div>;
}
