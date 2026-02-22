const express=require('express');
const router=express.Router();

const { userRegisterController } = require('../controller/auth.controller');
const { userLoginController } = require('../controller/auth.controller');



router.post('/register',userRegisterController);
router.post('/login',userLoginController);





module.exports=router;