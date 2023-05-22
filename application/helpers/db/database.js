"use strict";
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  //TODO make sure to change to the user you want to use
  user: "root", //Your DB username
  //TODO make sure to change to the correct password for your user.
  // password: "christine", //Your DB password
});

connection.query("USE CSC317db"); // set new DB to the current DB

function run(sql, next) {
  const result = connection.query(sql, function (err, results, fields) {
    if (err) {
      console.error(`Successfully executed ${sql}`, results);
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
function createPost(username, title, description, video, next) {
  run(
    `
  INSERT INTO posts (username, title, description, video)
    VALUES ("${username}", "${title}", "${description}", "${video}"))
  `,
    (e) => {
      next(e)
    }
  );
}

module.exports = {
  login: login,
  register: register,
  createPost: createPost,
};
