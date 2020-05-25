const routes = require("express").Router();
const service = require("../services/borrowerService");

console.log(service.borrowBook, service.returnBook);

//// List all books availible to borrow for the given branch
routes.get(
  "/borrowers/:cardNo/branches/:branchId/books",
  service.findCopiesByBranch
);

//// Borrow the book given in the POST request body
routes.post("/borrowers/:cardNo/branches/:branchId/books", service.borrowBook);

//// List specific Library Branch
routes.get("/borrowers/:cardNo/branches/:branchId", service.findBranchById);

//// List of all Library Branches
routes.get("/borrowers/:cardNo/branches", service.findAllBranches);

//// List of all active loans for given borrower
routes.get("/borrowers/:cardNo/loans", service.findActiveLoans);

//// return a book loan given in the PUT request body
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

//// return borrower details
routes.get("/borrowers/:cardNo", service.findBorrowerByCardNo);

//// return list of all borrowers
routes.get("/borrowers", service.findAllBorrowers);

module.exports = routes;
