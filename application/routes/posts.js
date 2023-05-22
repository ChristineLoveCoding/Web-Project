var express = require('express'); var router = express.Router();
const db = require("../helpers/db/database");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    db.createPost(req.session.username, req.body.title, req.body.description, req.body.video, function(error, user) {
      if (error) {
        res.render("error",  {message: `Login failed: ${error}`, error: error});
      } else {
        req.session = {
          username: user.username,
          email: user.email
        };
        res.render("profile", { title: "profile", username: user.username, email: user.email});
      }
    });
  }
});

module.exports = router;
