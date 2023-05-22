"use strict";
const { text } = require("express");
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
      if (e) {
        next(e);
      } else if (results.length == 0) {
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

function getUser(username, next) {
  run(
    `
    SELECT username, email, aboutme
    FROM users
    WHERE username = "${username}"
    `,
    (e, result) => {
      if (e) {
        next(e);
      } else if (result.length == 0) {
        next(`no user found with the username=${username}`);
      } else {
        next(null, result[0]);
      }
    }
  );
}

function updateUser(username, aboutme, next) {
  run(
    `
  UPDATE users
    SET aboutme = "${aboutme}"
    WHERE username = "${username}"
  `,
    (e) => {
      next(e)
    }
  );
}

// video is the file name. Only video under `${repos_root}/videa` would work.
// TODO: add thumbnail.
function createPost(username, title, description, thumbnail, path, mimetype, size, next) {
  run(
    `
  INSERT INTO posts (author, title, description, thumbnail, path, mimetype, size)
    VALUES ("${username}", "${title}", "${description}", "${thumbnail}", "${path}", "${mimetype}", "${size}")
  `,
    (e) => {
      next(e)
    }
  );
}

// video is the file name. Only video under `${repos_root}/videa` would work.
function listPosts(query, next) {
  let where = ""
  if (query && query.length > 0) {
    where = `WHERE title LIKE "%${query}%" OR title LIKE "%${query}%" `;
  }
  run(
    `
  SELECT id, author, title, description, thumbnail
  FROM posts
  ${where}
  `,
    (e, results) => {
      next(e, results);
    }
  );
}

function listPostsBy(author, next) {
  run(
    `
  SELECT id, author, title, description, thumbnail
  FROM posts
  WHERE author = "${author}"
  `,
    (e, results) => {
      next(e, results);
    }
  );
}


function getPost(id, next) {
  run(
    `
  SELECT id, author, title, description, thumbnail, path, mimetype, size
  FROM posts
  WHERE id = "${id}"
  `,
    (e, postResults) => {
      if (e) {
        next(e);
      } else if (postResults.length == 0) {
        next(`no post found with the id=${id}`);
      } else {
        run(
          `
          SELECT author, text, create_time
          FROM comments
          WHERE post_id = "${id}"
          ORDER BY create_time ASC
          `,
          (e, commentResults) => {
            if (e) {
              next(e);
            } else {
              next(null, postResults[0], commentResults);
            }
          }
        );
      }
    }
  );
}

function deletePost(username, postId, next) {
  run(
    `
    DELETE FROM posts
    WHERE id = "${postId}" AND author = "${username}"
  `,
    (e) => {
      next(e)
    }
  );
}

function makeComment(postId, author, text, next) {
  run(
    `
  INSERT INTO comments (post_id, author, text)
    VALUES ("${postId}", "${author}", "${text}")
  `,
    (e) => {
      next(e)
    }
  );
}


module.exports = {
  login: login,
  register: register,
  getUser: getUser,
  updateUser: updateUser,
  createPost: createPost,
  getPost: getPost,
  deletePost: deletePost,
  listPosts: listPosts,
  listPostsBy: listPostsBy,
  makeComment: makeComment,
};
