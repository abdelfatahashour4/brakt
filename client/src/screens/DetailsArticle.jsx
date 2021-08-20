import moment from "moment";
import React, {useEffect, useState} from "react";
import {AiFillDelete} from "react-icons/ai";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Socket} from "../App";
import "../assets/css/DetailsArticle.css";
import user from "../assets/images/user.png";
import Helmet from "../components/Helmet";
import Spinner from "../components/Spinner";
import {notify} from "../components/Toast";
import {apiAxios} from "../utilities/axios";
import {API_URL} from "../utilities/keys.json";
import {ADD_COMMENT, DELETE_COMMENT} from "../utilities/socket-events.json";

export default function DetailsArticle() {
  const params = useParams();
  const [article, setArticle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const {auth} = useSelector(state => state);

  const handleChangeComment = e => {
    setComment(e.target.value);
  };

  const deleteComment = (articleId, commentId) => {
    Socket.emit(DELETE_COMMENT, {articleId, commentId});
    setAllComments(allComments.filter(comment => comment._id !== commentId));
  };

  const addComment = (e, article) => {
    if (e.keyCode === 13) {
      if (comment.length > 0) {
        Socket.emit(ADD_COMMENT, {
          articleId: article._id,
          content: comment,
          user: auth.isLogin ? auth.username : "anonymous",
        });

        setAllComments([
          {
            _id: Math.ceil(allComments.length * Math.round(1)),
            content: comment,
          },
          ...allComments,
        ]);
        console.log(Math.ceil(allComments.length * Math.round(1)));
        setComment("");
      } else {
        notify("error", "comment mu be not empty");
      }
    }
  };

  useEffect(() => {
    if (article) {
      setAllComments(article.comments);
    }

    return () => {
      setAllComments();
    };
  }, [article]);

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
          setError(false);
        })
        .catch(() => {
          setLoading(false);
          setArticle(false);
          setError(false);
        });
    }

    fetchArticle();

    return () => {
      setArticle(false);
    };
  }, [params.articleId]);

  return (
    <>
      <Helmet title={article?.title} description={article?.description} />
      <main>
        {loading && <Spinner />}
        {!error && article && (
          <div className="container">
            <div className="container-article">
              <div className="box-image">
                <img
                  src={API_URL + "/v1/image/" + article.imageArticle}
                  alt={article.title}
                  loading="lazy"
                />
              </div>
              <div className="wrapper-content row my-2">
                <div className="box-details col-md-3 col-12">
                  <div>
                    By:{" "}
                    {article.author.firstName + " " + article.author.lastName}
                  </div>
                  <div>⌚ {moment(article.createdAt).fromNow()}</div>
                </div>
                <div className="box-title col-md-9 col-12">
                  <h3 className="p-2">👻 {article.title}</h3>
                </div>
                <div
                  className="box-content col-12 mt-3"
                  dangerouslySetInnerHTML={{__html: article.content}}
                ></div>

                <div className="box-create-comment col-12  my-3 d-flex flex-column align-items-center">
                  <label
                    htmlFor="createComment"
                    className="form-label text-capitalize text-start"
                  >
                    type comment
                  </label>
                  <input
                    type="text"
                    className="form-control w-50"
                    id="createComment"
                    placeholder="comment..."
                    value={comment}
                    onChange={handleChangeComment}
                    onKeyUp={e => addComment(e, article)}
                  />
                </div>

                <div className="display-all-comments col-md-6 col-12 mx-auto">
                  {allComments.map((comment, i) => {
                    return (
                      <div className="comment row" key={i}>
                        <div className="img-user col-2 d-flex justify-content-center align-items-center me-1">
                          <img src={user} alt="user" loading="lazy" />
                        </div>
                        <div className="comment-content col-9 d-flex justify-content-start align-items-center p-2 ">
                          {comment.content}
                        </div>
                        <button
                          className="btn-delete btn btn-danger col-1"
                          onClick={() =>
                            deleteComment(article._id, comment._id)
                          }
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger">something went wrong!</div>
        )}
      </main>
    </>
  );
}
