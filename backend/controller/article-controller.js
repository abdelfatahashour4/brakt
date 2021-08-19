const Article = require("../model/article-model");
const {checkCreateArticle} = require("../utilities/validateCreateArticle");
const fs = require("fs");
const path = require("path");

async function deleteImages(filename) {
  await fs.unlink(
    path.join(__dirname, "..", "public", "images", filename),
    error => {
      if (error) throw new Error(error.message);
    }
  );
}

async function createArticle(req, res) {
  try {
    const {error} = checkCreateArticle({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      content: req.body.content,
      tags: JSON.parse(req.body.tags),
    });

    if (error) {
      deleteImages(req.file.filename);
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const newArticle = new Article({
      author: req.user._id,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      content: req.body.content,
      tags: JSON.parse(req.body.tags),
      imageArticle: req.file.filename,
    });

    await newArticle.save();
    return res.status(201).json({
      message: "created article",
    });
  } catch (error) {
    deleteImages(req.file.filename);
    return res.status(500).json({message: error.message});
  }
}

async function getArticles(req, res) {
  try {
    const {category, tags, page} = req.query;
    const result = await Article.find({
      category,
      tags: tags === "All" ? {$gt: ""} : {$in: [tags]},
    })
      .populate("author")
      .skip(+page === 1 ? 0 : 8 * +page)
      .limit(+page * 8);
    return res.status(200).json({message: result});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function getArticlesWithTags(req, res) {
  try {
    const {tags, page} = req.query;

    const result = await Article.find({
      tags: tags === "All" ? {$gt: ""} : {$in: [tags]},
    })
      .populate("author")
      .skip(+page === 1 ? 0 : 8 * +page)
      .limit(+page * 6);

    return res.status(200).json({message: result});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function getOneArticleWithId(req, res) {
  try {
    const {articleId} = req.query;
    const result = await Article.findOne({_id: articleId}).populate("author");
    return res.status(200).json({message: result});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticlesWithTags,
  getOneArticleWithId,
};
