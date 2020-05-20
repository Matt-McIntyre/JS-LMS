const db = require("./db").getDb();

exports.findAll = async () =>
  await db.query("select * from tbl_library_branch", null);

  exports.find = async (id) =>
  await db.query("select * from tbl_library_branch where branchId = ?", [id]);
