import React from "react";
import "./spinner.css";

export default function index() {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{height: "100vh"}}
    >
      <div className="sp sp-3balls"></div>
    </div>
  );
}
