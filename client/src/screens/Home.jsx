import React, {useState} from "react";
import {Link} from "react-router-dom";
import Tags from "../utilities/tags_types.json";
import Helmet from "../components/Helmet";
import OneArticle from "../components/OneArticle";
import useFetch from "../hooks/useFetchArticles";
import Spinner from "../components/Spinner";
import "../assets/css/home.css";

export const articlesLinks = ["general", "technology", "healthy", "sports"];

export default function Home() {
  const [allArticles, setAllArticles] = useState({
    currentFilter: "general",
    page: 1,
  });

  const {loading, apiData, error} = useFetch(
    "GET",
    "/article",
    allArticles.currentFilter,
    null,
    allArticles.page
  );

  const toggleHotTags = () => {
    const elem = document.getElementById("hotTags");
    elem.classList.toggle("toggleHotTags");
  };

  const handleFilter = category => {
    setAllArticles({
      ...allArticles,
      currentFilter: category,
    });
  };

  return (
    <>
      <Helmet
        title="Brakt"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam atque corporis amet quam fuga nostrum nisi ipsam facilis quos, odit, consectetur, nobis cumque minus expedita? Nam dolor ex inventore ducimus."
      />
      <main className="home">
        <div className="hotTags" id="hotTags">
          <button className="open-tab-tags" onClick={toggleHotTags}>
            #🔥
          </button>
          <button className="close-tab-tags" onClick={toggleHotTags}>
            x
          </button>
          <ul className="list-unstyled text-center">
            {Tags.map(collect => {
              return collect.allTags.map((tag, i) => {
                return (
                  i <= 3 && (
                    <li key={i}>
                      <Link to="/"># {tag}</Link>
                    </li>
                  )
                );
              });
            })}
          </ul>
        </div>
        <div className="container">
          {/* start main article's */}
          <div className="flex d-flex justify-content-start main-articles">
            {loading && <Spinner />}
            <div className="container-articles p-2">
              {/* start nav articles */}
              <div className="container">
                <div className="nav-articles d-flex justify-content-start align-items-center">
                  <div className="list-nav">
                    {articlesLinks.map((item, i) => {
                      return (
                        <button
                          className={
                            allArticles.currentFilter === item
                              ? "active-btn-articles btn-nav mx-2 text-uppercase"
                              : "btn-nav mx-2 text-uppercase"
                          }
                          onClick={() => handleFilter(item)}
                          key={i}
                          aria-label={"nav " + item}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="wrapper-articles row d-flex flex-wrap justify-content-evenly align-items-start">
                  {!error &&
                    apiData.map((article, i) => {
                      return <OneArticle article={article} key={i} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
