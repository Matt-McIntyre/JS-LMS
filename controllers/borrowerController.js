const routes = require("express").Router();
const service = require("../services/borrowerService");

// (1) List all books availible to borrow for the given branch
routes.get("/borrowers/:cardNo/branches/:branchId/books", async (req, res) => {
  try {
    let result = await service.findCopiesByBranch(req);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (2) Borrow the book given in the POST request body
routes.post("/borrowers/:cardNo/branches/:branchId/books", async (req, res) => {
  try {
    await service.borrowBook(req);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send("Book borrowed.");
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (3) List specific Library Branch by branchId
routes.get("/borrowers/:cardNo/branches/:branchId", async (req, res) => {
  try {
    let result = await service.findBranchById(req);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (4) List of all Library Branches
routes.get("/borrowers/:cardNo/branches", async (req, res) => {
  try {
    let result = await service.findAllBranches();
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (5) List of all active loans for given borrower
routes.get("/borrowers/:cardNo/loans", async (req, res) => {
  try {
    let result = await service.findActiveLoans(req);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (6) return a book loan given in the PUT request body
routes.put("/borrowers/:cardNo/loans", async (req, res) => {
  try {
    await service.returnBook(req);
    res.status(200);
    res.send("Book returned.");
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (7) return borrower details
routes.get("/borrowers/:cardNo", async (req, res) => {
  try {
    let result = await service.findBorrowerByCardNo(req);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

// (8) return list of all borrowers 
routes.get("/borrowers", async (req, res) => {
  try {
    let result = await service.findAllBorrowers(req);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(400);
    res.send("Opperation failed.");
  }
});

module.exports = routes;