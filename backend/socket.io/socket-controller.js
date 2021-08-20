const Article = require("../model/article-model");
const {v4} = require("uuid");

async function addComment(data) {
  try {
    const {articleId, content, user} = data;
    console.log("data ", data);
    await Article.findByIdAndUpdate(
      articleId,
      {
        $addToSet: {
          comments: {
            _id: v4(),
            user,
            content,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
        console.log("added comment");
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteComment(data) {
  try {
    const {articleId, commentId} = data;

    await Article.findByIdAndUpdate(
      articleId,
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
        console.log("deleted comment");
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addComment,
  deleteComment,
};
