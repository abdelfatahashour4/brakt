import React from "react";
import {Link} from "react-router-dom";
import {API_URL} from "../../utilities/keys.json";
import moment from "moment";
import {AiTwotoneHeart} from "react-icons/ai";
import {BiLinkAlt} from "react-icons/bi";
import user from "../../assets/images/user.png";
import "./oneArticle.css";

export default function Index({article}) {
  return (
    <div className="one-article col-md-5 col-12 p-0">
      <div className="wrapper-image">
        <img
          src={API_URL + "/v1/image/" + article.imageArticle}
          alt={article.title}
          loading="lazy"
        />
        <div className="title">{article.title}</div>
        <div className={article.category + " category"}>{article.category}</div>
      </div>
      <div className="row article-details">
        <div className="col-2 img-user">
          <img src={user} alt="⚠" loading="lazy" className="mx-auto" />
        </div>
        <div className="details col-10 p-2">
          <span>
            🎩 {article.author.firstName + "  " + article.author.lastName}
          </span>
          <span className="mx-2">⌚ {moment(article.createdAt).fromNow()}</span>
          <h6 className="title">{article.title.slice(0, 55)}</h6>
          <div className="details d-flex justify-content-between align-align-items-baseline w-100">
            <div className="d-flex flex-wrap justify-content-evenly align-items-center w-50">
              {article.tags.map(tag => {
                return (
                  <span key={tag} className="ms-1">
                    <Link to={`/tags/${article.category}/${tag}`}>#{tag}</Link>
                  </span>
                );
              })}
            </div>
            <div className="save-article d-flex justify-content-evenly align-items-center w-50">
              <Link
                to={`/article/${article._id}`}
                aria-label="read full article"
                rel="next"
              >
                <BiLinkAlt /> full article
              </Link>
              <button className=".btn" aria-label="saved to favorite">
                <AiTwotoneHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
