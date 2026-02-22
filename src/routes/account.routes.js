const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { createAccountController } = require('../controller/account.controller');
const router = express.Router();

//post /api/accounts/
//create new account

router.post('/', authMiddleware, createAccountController);
module.exports = router;