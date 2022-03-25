import React, {useState} from "react";
import Helmet from "../components/Helmet";
import DataUI from "../utilities/tags_types.json";
import {articlesLinks} from "../screens/Home";
import SunTextEditor from "../components/SubTextEditor";
import {useDispatch, useSelector} from "react-redux";
import {validateTextEditor} from "../utilities/validateTextEditor";
import {apiAxios} from "../utilities/axios";
import {statePostAction, tagsAction} from "../redux/actions/createPost";
import {CHANGE_STATE_POST, CHANGE_TAGS_POST} from "../redux/types";
import {notify} from "../components/Toast";
import {useHistory} from "react-router-dom";
import "../assets/css/createPost.css";

export default function CreatePost() {
  const route = useHistory();
  const {createPost, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState();

  // handle other input like title, description...etc
  const handleChange = e => {
    dispatch(
      statePostAction(CHANGE_STATE_POST, {
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  // handle checked tags
  const handleChecked = e => {
    dispatch(
      tagsAction(CHANGE_TAGS_POST, {
        checked: e.target.checked,
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  // handle select image of post
  const handleChangeFile = e => {
    setFile(e.target.files[0]);
  };

  const handleCreatePort = async e => {
    e.preventDefault();
    await validateTextEditor(createPost)
      .then(async () => {
        if (auth.isLogin) {
          let newData = new FormData();
          for (const prop in createPost) {
            if (prop === "tags") {
              newData.append(prop, JSON.stringify(createPost[prop]));
            } else {
              newData.append(prop, createPost[prop]);
            }
          }
          newData.append("file", file);

          await apiAxios
            .post("/v1/article/createArticle", newData)
            .then(({data}) => {
              notify("success", data.message);
            })
            .catch(error => {
              if (error.response) {
                notify("error", error.response.data.message);
              } else if (error.request) {
                notify("error", "valid request");
              } else {
                notify("error", error.message);
              }
            });
        } else {
          route.push("/");
        }
      })
      .catch(error => {
        if (error.response) {
          notify("error", error.response.data.message);
        } else if (error.request) {
          notify("error", "valid request");
        } else {
          notify("error", error.message);
        }
      });
  };

  return (
    <React.Fragment>
      <Helmet
        title="Create Post"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
      />
      <main>
        <div className="container">
          <div className="d-flex flex-column mt-2 p-2 w-100">
            <h1 className="text-uppercase">🚀 Create Post</h1>
            <div className="container-create-post">
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-capitalize">
                  📢 Title
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="title"
                  placeholder="title..."
                  name="title"
                  value={createPost.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="category"
                  className="form-label text-capitalize"
                >
                  🛩 category
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="select category"
                  defaultValue={createPost.category}
                  name="category"
                  id="category"
                  onChange={handleChange}
                >
                  <option value="">Open this select category</option>
                  {articlesLinks.map((item, i) => {
                    return (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="d-flex flex-wrap mb-3">
                <label
                  htmlFor="tags"
                  className="form-label text-capitalize w-100 mb-3"
                >
                  🎯 Tags
                </label>
                {!createPost.category && (
                  <small style={{fontSize: "12px", padding: "4px"}}>
                    please select one category
                  </small>
                )}
                {createPost.category &&
                  DataUI.filter(
                    item => item.category === createPost.category
                  ).map(result => {
                    return result.allTags.map((tag, i) => {
                      return (
                        <div className="form-check w-50" key={i} id="tags">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={tag}
                            id={tag}
                            name="tags"
                            checked={createPost.tags.includes(tag)}
                            onChange={handleChecked}
                          />
                          <label className="form-check-label" htmlFor={tag}>
                            {tag}
                          </label>
                        </div>
                      );
                    });
                  })}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label text-capitalize"
                >
                  📝 description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="It's description article..."
                  name="description"
                  value={createPost.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3 bg-light">
                <label className="form-label text-capitalize w-100">
                  🔥 content
                </label>
                <SunTextEditor />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="imagePost"
                  className="form-label text-capitalize"
                >
                  🤳🏻 choose main image of article
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="imagePost"
                  name="imagePost"
                  onChange={handleChangeFile}
                />
              </div>

              <div className="my-3" style={{lineHeight: "100px"}}>
                <button
                  className="btn btn-primary text-uppercase w-100"
                  onClick={handleCreatePort}
                  style={{
                    fontWeight: 700,
                    wordSpacing: "8px",
                  }}
                >
                  create post
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
