import React, {lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Spinner from "./components/Spinner";
import Toaster from "./components/Toast";
import Bar from "./components/Bar";
import SignUp from "./screens/signup";
import ResetPassword from "./screens/ResetPassword";
import ForgetPassword from "./screens/ForgetPassword";
import Login from "./screens/login";
import {useSelector} from "react-redux";
import DetailsArticle from "./screens/DetailsArticle";
const Home = lazy(() => import("./screens/Home.jsx"));
const About = lazy(() => import("./screens/About.jsx"));
const Faq = lazy(() => import("./screens/Faq.jsx"));
const Contact = lazy(() => import("./screens/Contact.jsx"));
const OneTag = lazy(() => import("./screens/OneTag.jsx"));
const Tags = lazy(() => import("./screens/Tags.jsx"));
const CreatePost = lazy(() => import("./screens/CreatePost.jsx"));

export default function App() {
  const {auth} = useSelector(state => state);

  return (
    <div className="App">
      <BrowserRouter>
        <Bar />
        <Toaster />
        <Switch>
          <Route path="/tags/:category/:oneTag">
            <Suspense fallback={<Spinner />}>
              <OneTag />
            </Suspense>
          </Route>
          <Route path="/tags">
            <Suspense fallback={<Spinner />}>
              <Tags />
            </Suspense>
          </Route>
          <Route path="/article/:articleId">
            <Suspense fallback={<Spinner />}>
              <DetailsArticle />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          </Route>
          <Route path="/contact">
            <Suspense fallback={<Spinner />}>
              <Contact />
            </Suspense>
          </Route>
          <Route path="/forget-password/reset">
            <Suspense fallback={<Spinner />}>
              {!auth.isLogin ? <ResetPassword /> : <Home />}
            </Suspense>
          </Route>
          <Route path="/forget-password">
            <Suspense fallback={<Spinner />}>
              {auth.isLogin ? <ForgetPassword /> : <Home />}
            </Suspense>
          </Route>
          <Route path="/signup">
            <Suspense fallback={<Spinner />}>
              {!auth.isLogin ? <SignUp /> : <Home />}
            </Suspense>
          </Route>
          <Route path="/login">
            <Suspense fallback={<Spinner />}>
              {!auth.isLogin ? <Login /> : <Home />}
            </Suspense>
          </Route>
          <Route path="/FAQ">
            <Suspense fallback={<Spinner />}>
              <Faq />
            </Suspense>
          </Route>
          <Route path="/create-post">
            <Suspense fallback={<Spinner />}>
              <CreatePost />
            </Suspense>
          </Route>
          <Route path="/" exact>
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          </Route>
          <Route>
            <Suspense fallback={<Spinner />}>
              <PageNotFound />
            </Suspense>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function PageNotFound() {
  return <h1>404 page not found</h1>;
}
