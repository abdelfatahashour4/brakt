import React from "react";
import toast, {Toaster} from "react-hot-toast";

const notify = (type, msg) => toast[type](msg);

export {notify};

export default function index() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#0b0b0b",
        },
      }}
    />
  );
}
