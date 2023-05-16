var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:" Christine " });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'CSC 317 App', name:" Christine " });
});

router.get('/postvideo.html', function(req, res, next) {
  res.render('postvideo', { title: 'CSC 317 App', name:" Christine " });
});

router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:" Christine " });
});

router.get('/viewpost.html', function(req, res, next) {
  res.render('viewpost', { title: 'CSC 317 App', name:" Christine " });
});

router.get('/profile.html', function(req, res, next) {
  res.render('profile', { title: 'CSC 317 App', name:" Christine " });
});

router.get('/registration.html', function(req, res, next) {
  res.render('registration', { title: 'CSC 317 App', name:" Christine " });
});





module.exports = router;
