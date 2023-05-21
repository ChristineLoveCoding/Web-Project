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
      next(`Error executing ${sql}: ${err}`, null);
    } else {
      console.log(`Successfully executed ${sql}`, result[0]);
      next(null, results);
    }
  });
}

function register(username, email, password, next) {
  run(
    `
  INSERT INTO users (username, email, password_hash)
    VALUES ("${username}", "${email}", MD5("${password}"))
  `,
    (e) => {
      next(e);
    }
  );
}

module.exports = {
  register: register,
};
