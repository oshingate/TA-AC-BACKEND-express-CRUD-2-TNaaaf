let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    content: { type: String, require: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    likes: { type: Number, default: 0 },
    author: String,
  },
  { timestamps: true }
);

let Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
