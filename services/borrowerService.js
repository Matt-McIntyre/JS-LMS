const db = require("../dao/db").getDb();
const borrowerDao = require("../dao/borrowerDao");
const bookLoansDao = require("../dao/bookLoansDao");
const branchDao = require("../dao/branchDao");
const copiesDao = require("../dao/copiesDao");

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

exports.findCopiesByBranch = async function (req, res) {
  try {
    let result = await copiesDao.findCopiesByBranch(req.params.branchId);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404);
    res.send();
  }
};

exports.findBranchById = async function (req, res) {
  try {
    let result = await branchDao.find(req.params.branchId);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404);
    res.send();
  }
};

exports.findAllBranches = async function (req, res) {
  try {
    let result = await branchDao.findAll();
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404);
    res.send();
  }
};

exports.findActiveLoans = async function (req, res) {
  try {
    let result = await bookLoansDao.findActiveByCardNo(req.params.cardNo);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404);
    res.send();
  }
};

exports.findBorrowerByCardNo = async function (req, res) {
  try {
    let result = await borrowerDao.findById(req.params.cardNo);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404);
    res.send();
  }
};

exports.findAllBorrowers = async function (req, res) {
  try {
    let result = await borrowerDao.findAll();
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(404);
    res.send();
  }
};
