const db = require("./db").getDb();

exports.findAll = async () => await db.query("select * from tbl_book", null);

exports.findById = async (id) =>
  await db.query("select * from tbl_book where bookId = ?", [id]);