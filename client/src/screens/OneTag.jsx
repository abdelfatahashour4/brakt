import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Helmet from "../components/Helmet";
import OneArticle from "../components/OneArticle";
import Spinner from "../components/Spinner";
import {apiAxios} from "../utilities/axios";

export default function OneTag() {
  const {oneTag} = useParams();
  const [article, setArticle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page] = useState(1);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      await apiAxios
        .get("/v1/article/tags", {
          params: {
            tags: oneTag,
            page: page,
          },
        })
        .then(({data}) => {
          setLoading(false);
          setArticle(data.message);
          setError(error);
        })
        .catch(error => {
          console.log("Error ", error);
          setLoading(false);
          setArticle(false);
          setError(true);
        });
    }

    fetchArticle();

    return () => {
      setArticle(false);
      setError(false);
      setLoading(false);
    };
  }, [oneTag, error, page]);

  return (
    <>
      <Helmet
        title={"#" + oneTag.toUpperCase()}
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nulla sed odio animi. Magnam mollitia itaque commodi blanditiis iure accusantium rerum laudantium deserunt adipisci. Temporibus aliquid incidunt non hic! Qui."
      />
      <main>
        {loading && <Spinner />}
        {error && (
          <div className="alert alert-danger">something went wrong!</div>
        )}
        {!error && article.length > 0 && (
          <>
            <h1 className="text-center mt-3 p-1">#{oneTag.toUpperCase()}</h1>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-start">
                {!error &&
                  article.map(item => {
                    return (
                      <React.Fragment key={item._id}>
                        <OneArticle
                          article={item}
                          currentWidth="col-md-8 col-12"
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </>
        )}
        {!error && article.length === 0 && (
          <div className="row m-0 p-0">
            <div
              class="alert alert-light text-center mt-5 col-md-6 col-12 mx-auto"
              role="alert"
            >
              not available article match with #{oneTag}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
