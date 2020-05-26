const db = require("./db").getDb();

exports.findActiveByCardNo = async (cardNo) =>
  await db.query(
    "select * from tbl_book_loans where cardNo = ? and dateIn is null",
    [cardNo]
  );

exports.borrowBook = async (copies, cardNo) =>
  await db.query(
    "insert into tbl_book_loans (branchId, cardNo, dateOut, dueDate, dateIn) values (?,?,?,now(),date_add(now(), interval 7 DAY),null)",
    [copies.bookId, copies.branchId, cardNo]
  );

exports.returnBook = async (loan) => 
  await db.query(
    "update tbl_book_loans set dateIn = now() where loanId = ?",
    [loan.loanId]
  );
