import React from "react";
import {useSelector} from "react-redux";
import Helmet from "../components/Helmet";
import OneArticle from "../components/OneArticle";

export default function Wishlist() {
  const {wishlist} = useSelector(state => state);
  return (
    <>
      <Helmet title="♥ wishlist" />
      <main>
        <div className="container">
          <div className="d-flex flex-wrap w-100 justify-content-center align-items-start">
            {wishlist.length > 0 &&
              wishlist.map((article, i) => {
                return <OneArticle article={article} key={i} />;
              })}
            {wishlist.length === 0 && (
              <div className="alert alert-info">wishlist is empty</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
