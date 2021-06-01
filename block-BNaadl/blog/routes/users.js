var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);

    res.render('userList', { users: users });
  });
});

router.get('/new', (req, res, next) => {
  res.render('newUserForm');
});

router.post('/new', (req, res, next) => {
  let data = req.body;
  User.create(data, (err, createdUser) => {
    if (err) return next(err);

    res.redirect('/users');
  });
});

router.get('/:id/info', (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, user) => {
    if (err) return next(err);

    res.render('userDetails', { user: user });
  });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    res.render('editUserForm', { user: user });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  User.findByIdAndUpdate(id, data, (err, user) => {
    res.redirect('/users');
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndDelete(id, (err, user) => {
    res.redirect('/users');
  });
});

router.get('/:id/incrementlikes', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, user) => {
    res.redirect('/users/');
  });
});

router.get('/:id/decrementlikes', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, user) => {
    res.redirect('/users/');
  });
});
module.exports = router;
