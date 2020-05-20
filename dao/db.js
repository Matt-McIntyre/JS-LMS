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
        conn.query(sql, args, (error, result) =>
          error ? reject(error) : resolve(result)
        );
      });
    },
    beginTransaction() {
      return new Promise((resolve, reject) => {
        conn.beginTransaction((error) =>
          error ? reject(error) : resolve(null)
        );
      });
    },
    rollback() {
      return new Promise((resolve, reject) => {
        conn.rollback((error) => (error ? reject(error) : resolve(null)));
      });
    },
    commit() {
      return new Promise((resolve, reject) => {
        conn.commit((error) => (error ? reject(error) : resolve(null)));
      });
    },
  };
};
