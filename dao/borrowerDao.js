const db = require("./db").getDb();

exports.findAll = async () =>
  await db.query("select * from tbl_borrower", null);

exports.findById = async (id) =>
  await db.query("select * from tbl_borrower where cardNo = ?", [id]);
