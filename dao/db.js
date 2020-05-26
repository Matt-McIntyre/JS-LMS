const mysql = require("mysql");

exports.getDb = () => {
  const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "library",
  });
  return {
    query(sql, args) {
      return new Promise((resolve, reject) => {
        console.log(`sending query:\n${sql}\n${args}`);
        conn.query(sql, args, (error, result) =>
          error ? reject(error) : resolve(result)
        );
      });
    },
    beginTransaction() {
      return new Promise((resolve, reject) => {
        console.log("beginning transaction.");
        conn.beginTransaction((error) =>
          error ? reject(error) : resolve("transaction begun.")
        );
      });
    },
    rollback() {
      return new Promise((resolve, reject) => {
        console.log("rolling back.");
        conn.rollback((error) =>
          error ? reject(error) : resolve("rollback successful.")
        );
      });
    },
    commit() {
      return new Promise((resolve, reject) => {
        console.log("committing.");
        conn.commit((error) =>
          error ? reject(error) : resolve("commit successful.")
        );
      });
    },
  };
};
