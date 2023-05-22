var express = require('express'); var router = express.Router();
const db = require("../helpers/database");

/* GET posts listing. */
router.post("/", function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    // TODO: pass in real thumbnail.
    db.createPost(req.session.username, req.body.title, req.body.description, req.body.video, "/public/profile.png", function(error) {
      if (error) {
        res.render("error",  {message: `Create post failed: ${error}`, error: error});
      } else {
        res.redirect("/profile.html");
      }
    });
  }
});

router.get("/:post_id", function (req, res, next) {
  db.getPost(req.params.post_id, function(error, post, comments) {
    if (error) {
      res.render("error",  {message: `View post failed: ${error}`, error: error});
    } else {
      res.render('viewpost', { title: 'Viewpost', username: req.session.username, post: post, comments: comments });
    }
  });
});

router.post("/:post_id/comments", function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    db.makeComment(req.params.post_id, req.session.username, req.body.comment, function(error) {
      if (error) {
        res.render("error",  {message: `Post comments failed: ${error}`, error: error});
      } else {
        res.redirect(`/posts/${req.params.post_id}`);
      }
    });
  }
});

module.exports = router;
