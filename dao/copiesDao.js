const db = require("./db").getDb();

exports.findCopiesByBranch = async (id) =>
  await db.query(
    "select c.bookId, c.branchId, c.noOfCopies, b.title from tbl_book_copies c join tbl_book b on c.bookId = b.bookId where c.branchId = ?",
    [id]
  );

exports.addCopy = async (copies) =>
  await db.query(
    "update tbl_book_copies set noOfCopies = noOfCopies +1 where bookId = ? and branchId = ?",
    [copies.bookId, copies.branchId]
  );

exports.removeCopy = async (copies) =>
  await db.query(
    "update tbl_book_copies set noOfCopies = noOfCopies -1 where bookId = ? and branchId = ?",
    [copies.bookId, copies.branchId]
  );
