const routes = require("express").Router();
const service = require("../services/borrowerService");

console.log(service.borrowBook, service.returnBook)

routes
  .get("/borrowers/:id/branches/:bid/books", service.findCopiesByBranch)
  .post("/borrowers/:id/branches/:bid/books", service.borrowBook)
  .get("/borrowers/:id/branches/:bid", service.findBranchById)
  .get("/borrowers/:id/branches", service.findAllBranches)
  .get("/borrowers/:id/loans", service.findActiveLoans)
  .put("/borrowers/:id/loans", service.returnBook)
  .get("/borrowers/:id", service.findBorrowerByCardNo)
  .get("/borrowers", service.findAllBorrowers);

module.exports = routes; 