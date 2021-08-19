const {Schema, model} = require("mongoose");
const {ObjectId} = Schema.Types;

const articleSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "Author",
    },
    title: String,
    category: String,
    description: String,
    imageArticle: String,
    content: String,
    like: {type: Object, default: []},
    unlike: {type: Object, default: []},
    comments: {type: Object, default: []},
    tags: {type: [String], default: []},
    visible: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

module.exports = model("Article", articleSchema);
