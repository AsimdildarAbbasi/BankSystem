const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const transactionController = require('../controller/transaction.controller');

const transactionRoute = Router();

transactionRoute.post(
  "/",
  authMiddleware.authMiddleware,
  transactionController.createTransaction
);

transactionRoute.post(
  "/system/initial-fund",
  authMiddleware.authSystemMiddleware,
  transactionController.createInitialFundsTransaction
);

module.exports = transactionRoute;