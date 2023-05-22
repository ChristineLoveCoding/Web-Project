var express = require('express');
var router = express.Router();
const db = require("../helpers/database");

router.get('/index.html', function(req, res, next) {
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  db.listPosts(req.query.q, function(error, results) {
    if (error) {
      res.render("error",  {message: `Cannot fetch posts: ${error}`, error: error});
    } else {
      res.render('index', { title: 'Home', username: req.session.username, posts: results });
    }
  });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Login', username: req.session.username }); 
});

router.get('/postvideo.html', function(req, res, next) {
  res.render('postvideo', { title: 'Postvideo', username: req.session.username });
});

router.get('/profile.html', function(req, res, next) {
  if (!req.session || !req.session.username) {
    res.render("please_login");
  } else {
    db.listPostsBy(req.session.username, function(error, posts) {
      if (error) {
        res.render("error",  {message: `Cannot fetch posts: ${error}`, error: error});
      } else {
        db.getUser(req.session.username, function(error, user) {
          if (error) {
            res.render("error",  {message: `Cannot fetch user details: ${error}`, error: error});
          } else {
            res.render("profile", { title: "Profile", username: req.session.username, user: user, posts: posts});
          }
        })
      }
    });
  }
});

router.get('/registration.html', function(req, res, next) {
  res.render('registration', { title: 'Registration', username: req.session.username });
});

module.exports = router;
