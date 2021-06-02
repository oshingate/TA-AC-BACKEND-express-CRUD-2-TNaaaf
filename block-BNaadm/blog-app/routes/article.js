let express = require('express');
let Article = require('../models/article');
let Comment = require('../models/comment');

let router = express.Router();

//handle get all list of articles

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);

    res.render('listArticles', { articles: articles });
  });
});

//handle create new article

router.get('/new', (req, res, next) => {
  res.render('createArticleForm');
});

router.post('/new', (req, res, next) => {
  let data = req.body;
  Article.create(data, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/');
  });
});

//get details page

router.get('/:id', (req, res, next) => {
  let articleId = req.params.id;
  Article.findById(articleId, (err, article) => {
    if (err) return next(err);
    Comment.find({ articleId: articleId }, (err, comments) => {
      res.render('ArticleDetails', { article: article, comments: comments });
    });
  });
});

//likes handler

router.get('/:id/likes/increment', (req, res, next) => {
  let articleId = req.params.id;

  Article.findByIdAndUpdate(
    articleId,
    { $inc: { likes: 1 } },
    (err, updated) => {
      res.redirect('/articles/' + articleId);
    }
  );
});

router.get('/:id/likes/decrement', (req, res, next) => {
  let articleId = req.params.id;

  Article.findByIdAndUpdate(
    articleId,
    { $inc: { likes: -1 } },
    (err, updated) => {
      res.redirect('/articles/' + articleId);
    }
  );
});

//edit article

router.get('/:id/edit', (req, res, next) => {
  let articleId = req.params.id;
  Article.findById(articleId, (err, article) => {
    if (err) return next(err);
    res.render('articleEditForm', { article: article });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let articleId = req.params.id;
  let data = req.body;
  Article.findByIdAndUpdate(articleId, data, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + articleId);
  });
});

//delete articles

router.get('/:id/delete', (req, res, next) => {
  let articleId = req.params.id;

  Article.findByIdAndDelete(articleId, (err, deletedArticle) => {
    if (err) return next(err);

    res.redirect('/articles');
  });
});

// handle post on comment

router.post('/:id/comment', (req, res, next) => {
  let articleId = req.params.id;
  req.body.articleId = articleId;
  let data = req.body;
  Comment.create(data, (err, created) => {
    if (err) return next(err);

    res.redirect('/articles/' + articleId);
  });
});

module.exports = router;
