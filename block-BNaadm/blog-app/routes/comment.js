let express = require('express');
let Comment = require('../models/comment');
let Article = require('../models/article');

let router = express.Router();

//edit comment
router.get('/:id/edit', (req, res, next) => {
  let commentId = req.params.id;
  Comment.findById(commentId, (err, comment) => {
    res.render('commentEditForm', { comment: comment });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let commentId = req.params.id;
  let data = req.body;
  Comment.findByIdAndUpdate(commentId, data, (err, comment) => {
    res.redirect('/articles/' + comment.articleId);
  });
});

//delete comment

router.get('/:id/delete', (req, res, next) => {
  let commentId = req.params.id;

  Comment.findByIdAndDelete(commentId, (err, comment) => {
    res.redirect('/articles/' + comment.articleId);
  });
});

module.exports = router;
