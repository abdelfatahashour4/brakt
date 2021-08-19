import React from "react";
import Helmet from "../components/Helmet";
import {Link} from "react-router-dom";
import "../assets/css/contact.css";

export default function Contact() {
  return (
    <React.Fragment>
      <Helmet
        title="Contact us"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
      />
      <main className="main-contact">
        <div className="container">
          <section className="contact">
            <h1 className="text-uppercase">contact</h1>
            <p className="lead">Brakt Community would love to hear from you!</p>
            <div className="d-flex flex-column">
              <span>
                Email :{" "}
                <a href="https://www.gmail.com" aria-label="go to gmail">
                  gmail
                </a>
              </span>
              <span>
                Twitter :{" "}
                <a href="https://www.twitter.com" aria-label="go to twitter">
                  twitter
                </a>
              </span>
              <span>
                Report a vulnerability:
                <Link to="/" aria-label="go to home">
                  Brakt/security 🐛
                </Link>
              </span>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
}
