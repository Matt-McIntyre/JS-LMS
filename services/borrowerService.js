const db = require("../dao/db").getDb();
const borrowerDao = require("../dao/borrowerDao");
const bookLoansDao = require("../dao/bookLoansDao");
const branchDao = require("../dao/branchDao");
const copiesDao = require("../dao/copiesDao");

// (1) List all books availible to borrow for the given branch
exports.findCopiesByBranch = async function (req) {
  try {
    let result = await copiesDao.findCopiesByBranch(req.params.branchId);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// (2) Borrow the book given in the POST request body
exports.borrowBook = async function (req) {
  try {
    console.log("Borrowing book.")
    await db.beginTransaction();
    await bookLoansDao.borrowBook(req.body, req.params.cardNo);
    await copiesDao.removeCopy(req.body);
    await db.commit();
  } catch (e) {
    console.log(e);
    await db.rollback();
    throw e;
  }
};

// (3) List specific Library Branch by branchId
exports.findBranchById = async function (req) {
  try {
    let result = await branchDao.find(req.params.branchId);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// (4) List of all Library Branches
exports.findAllBranches = async function () {
  try {
    let result = await branchDao.findAll();
    return result;
  } catch (e) {
    console.log(e);
    throw e
  }
};

// (5) List of all active loans for given borrower
exports.findActiveLoans = async function (req) {
  try {
    let result = await bookLoansDao.findActiveByCardNo(req.params.cardNo);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// (6) return a book loan given in the PUT request body
exports.returnBook = async function (req) {
  try {
    console.log("Returning book.");
    await db.beginTransaction();
    await bookLoansDao.returnBook(req.body);
    await copiesDao.addCopy(req.body);
    await db.commit();
  } catch (e) {
    console.log(e);
    await db.rollback();
    throw e;
  }
};

// (7) return borrower details
exports.findBorrowerByCardNo = async function (req, res) {
  try {
    let result = await borrowerDao.find(req.params.cardNo);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// (8) return list of all borrowers 
exports.findAllBorrowers = async function (req, res) {
  try {
    let result = await borrowerDao.findAll();
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
