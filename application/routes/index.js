var express = require('express');
var router = express.Router();
const handlers = require("../helpers/handlers");

router.get('/', handlers.homeHandler);
router.get('/index.html', handlers.homeHandler);

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Login', username: req.session.username }); 
});

router.get('/postvideo.html', function(req, res, next) {
  res.render('postvideo', { title: 'Postvideo', username: req.session.username });
});

router.get('/viewpost.html', function(req, res, next) {
  const dummyPost = {
    author: "Christine",
    create_time: "2023 Jan 1 ",
    title: "Christine's school life vlog 1",
    video: "test.mp4",
  }
  res.render('viewpost', { title: 'Viewpost', username: req.session.username, post: dummyPost});
});

router.get('/profile.html', function(req, res, next) {
  res.render("profile", { title: "Profile", username: req.session.username, email: req.session.email});
});

router.get('/registration.html', function(req, res, next) {
  res.render('registration', { title: 'Registration', username: req.session.username });
});

module.exports = router;
