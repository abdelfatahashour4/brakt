import moment from "moment";
import React from "react";
import {AiOutlineHeart} from "react-icons/ai";
import {BiLinkAlt} from "react-icons/bi";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import user from "../../assets/images/user.png";
import {ToggleWishlist} from "../../utilities/useAddWishlist";
import "./oneArticle.css";

export default function Index({article, currentWidth}) {
  const dispatch = useDispatch();
  return (
    <div className={"one-article p-0 " + currentWidth} key={article._id}>
      <button
        className="btn-save"
        aria-label="saved to favorite"
        onClick={() => ToggleWishlist(article, dispatch)}
      >
        <AiOutlineHeart />
      </button>
      <div className="wrapper-image">
        <img
          src={process.env.REACT_APP_API + "/v1/image/" + article.imageArticle}
          alt={article.title}
          loading="lazy"
        />
        <div className={article.category + " category"}>{article.category}</div>
      </div>
      <div className="row article-details">
        <div className="col-2 img-user">
          <img src={user} alt="⚠" loading="lazy" className="mx-auto" />
        </div>
        <div className="details col-10 p-2">
          <span className="text-capitalize">
            By: {article.author.firstName + "  " + article.author.lastName}
          </span>
          <span className="mx-2">⌚ {moment(article.createdAt).fromNow()}</span>
          <h6 className="title my-2">{article.title.slice(0, 55)}</h6>
          <div className="details d-flex justify-content-between align-items-baseline w-100">
            <div className="d-flex flex-wrap justify-content-evenly align-items-center">
              {article.tags.map(tag => {
                return (
                  <span key={tag} className="ms-1">
                    <Link to={`/tags/${tag}`}>#{tag}</Link>
                  </span>
                );
              })}
            </div>

            <div className="save-article d-flex justify-content-evenly align-items-center">
              <Link
                to={`/article/${article._id}`}
                aria-label="read full article"
                rel="next"
              >
                <BiLinkAlt /> full article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
