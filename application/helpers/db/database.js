"use strict";
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  //TODO make sure to change to the user you want to use
  user: "root", //Your DB username
  //TODO make sure to change to the correct password for your user.
  password: "christine", //Your DB password
});

connection.query("USE CSC317db"); // set new DB to the current DB

function run(sql, next) {
  const result = connection.query(sql, function (err, results, fields) {
    if (err) {
      console.error(`Failed to executed ${sql}`, err);
      next(`Error executing ${sql}: ${err}`, null);
    } else {
      console.log(`Successfully executed ${sql}`, results);
      next(null, results);
    }
  });
}

function login(username, password, next) {
  run(
    `
  SELECT username, email FROM users
  WHERE username = "${username}" AND password_hash = MD5("${password}");
  `,
    (e, results) => {
      if (results.length == 0) {
        next("invalid username or password");
      } else {
        next(null, results[0]);
      }
    }
  );
}

function register(username, email, password, next) {
  run(
    `
  INSERT INTO users (username, email, password_hash)
    VALUES ("${username}", "${email}", MD5("${password}"))
  `,
    (e) => {
      next(e)
    }
  );
}

// video is the file name. Only video under `${repos_root}/videa` would work.
// TODO: add thumbnail.
function createPost(username, title, description, video, thumbnail, next) {
  run(
    `
  INSERT INTO posts (author, title, description, video, thumbnail)
    VALUES ("${username}", "${title}", "${description}", "${video}", "${thumbnail}")
  `,
    (e) => {
      next(e)
    }
  );
}

// video is the file name. Only video under `${repos_root}/videa` would work.
// TODO: add thumbnail.
function listPost(next) {
  run(
    `
  SELECT author, title, description, video, thumbnail
  FROM posts
  `,
    (e, results) => {
      next(e, results);
    }
  );
}

/* GET home page. Reused in 3 placed. */
const homeHandler = function(req, res, next) {
  listPost(function(error, results) {
    if (error) {
      res.render("error",  {message: `Cannot fetch posts: ${error}`, error: error});
    } else {
      res.render('index', { title: 'Home', username: req.session.username, posts: results });
    }
  });
}

module.exports = {
  login: login,
  register: register,
  createPost: createPost,
  listPost: listPost,
  homeHandler: homeHandler,
};
