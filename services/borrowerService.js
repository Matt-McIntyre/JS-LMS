const db = require("../dao/db").getDb();
const borrowerDao = require("../dao/borrowerDao");
const bookLoansDao = require("../dao/bookLoansDao");
const branchDao = require("../dao/branchDao");
const copiesDao = require("../dao/copiesDao");


exports.returnBook = async function (req, res) {
  try {
    await db.beginTransaction();
    await bookLoansDao.returnBook(req.params.id, req.body);
    await copiesDao.addCopy(req.body);
    await db.commit();
    res.status(200);
    res.send("Book returned.");
  } catch (e) {
    console.log(e);
    await db.rollback();
    res.status(400);
    res.send("Opperation failed.");
  } 
}

exports.borrowBook = async function (req, res) {
  try {
    await db.beginTransaction();
    await bookLoansDao.borrowBook(req.params.id, req.body);
    await copiesDao.removeCopy(req.body);
    await db.commit();
    res.status(201);
    res.send("Book borrowed.");
  } catch (e) {
    console.log(e);
    await db.rollback();
    res.status(400);
    res.send("Opperation failed.");
  } 
}

exports.findCopiesByBranch = async function (req, res) {
  try {
    let result = await copiesDao.findCopiesByBranch(req.params.id);
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
    let result = await branchDao.find(req.params.bid);
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
    let result = await bookLoansDao.findActiveByCardNo(req.params.id);
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
    let result = await borrowerDao.findById(req.params.id);
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