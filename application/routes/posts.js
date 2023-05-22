var express = require('express'); var router = express.Router();
const db = require("../helpers/db/database");

/* GET posts listing. */
router.post("/", function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    // TODO: pass in real thumbnail.
    db.createPost(req.session.username, req.body.title, req.body.description, req.body.video, "/public/profile.png", function(error, user) {
      if (error) {
        res.render("error",  {message: `Login failed: ${error}`, error: error});
      } else {
        db.homeHandler(req, res, next);
      }
    });
  }
});

module.exports = router;
