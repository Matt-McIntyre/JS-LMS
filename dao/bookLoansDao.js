const db = require("./db").getDb();

exports.findActiveByCardNo = async (cn) =>
  await db.query(
    "select * from tbl_book_loans where cardNo = ? and dateIn is null",
    [cn]
  );

exports.borrowBook = async (cardNo, copies) =>
  await db.query(
    "insert into tbl_book_loans values (?,?,?,now(),date_add(now(), interval 7 DAY),null)",
    [copies.bookId, copies.branchId, cardNo]
  );

exports.returnBook = async (cardNo, loan) => 
  await db.query(
    "update tbl_book_loans set dateIn = now() where bookId = ? and branchId = ? and cardNo = ? ",
    [loan.bookId, loan.branchId, cardNo]
  );
