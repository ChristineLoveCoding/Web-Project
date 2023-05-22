var express = require('express'); var router = express.Router();
const db = require("../helpers/database");
const handlers = require("../helpers/handlers");

/* GET posts listing. */
router.post("/", function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    // TODO: pass in real thumbnail.
    db.createPost(req.session.username, req.body.title, req.body.description, req.body.video, "/public/profile.png", function(error, user) {
      if (error) {
        res.render("error",  {message: `Create post failed: ${error}`, error: error});
      } else {
        handlers.homeHandler(req, res, next);
      }
    });
  }
});

router.get("/:id", function (req, res, next) {
  console.log(req.params.id);
  db.getPost(req.params.id, function(error, post) {
    if (error) {
      res.render("error",  {message: `View post failed: ${error}`, error: error});
    } else {

      res.render('viewpost', { title: 'Viewpost', username: req.session.username, post: post });
    }
  });
});

module.exports = router;
