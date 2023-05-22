const db = require("./database");

const homeHandler = function(req, res, next) {
  db.listPosts(req.query.q, function(error, results) {
    if (error) {
      res.render("error",  {message: `Cannot fetch posts: ${error}`, error: error});
    } else {
      res.render('index', { title: 'Home', username: req.session.username, posts: results });
    }
  });
}

module.exports = {
  homeHandler: homeHandler,
};