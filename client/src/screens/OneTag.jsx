import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiAxios} from "../utilities/axios";
import Helmet from "../components/Helmet";

export default function OneTag() {
  const {category, oneTag} = useParams();
  const [article, setArticle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  console.log(article);
  console.log(error);
  console.log(page);
  console.log(setPage);
  console.log(loading);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      await apiAxios
        .get("/v1/article/tags", {
          params: {
            tags: oneTag,
            page: 1,
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
  }, [category, oneTag]);

  return (
    <>
      <Helmet
        title={"#" + category.toUpperCase()}
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nulla sed odio animi. Magnam mollitia itaque commodi blanditiis iure accusantium rerum laudantium deserunt adipisci. Temporibus aliquid incidunt non hic! Qui."
      />
      <main>
        <div className="container">
          <div>hello world</div>
        </div>
      </main>
    </>
  );
}
