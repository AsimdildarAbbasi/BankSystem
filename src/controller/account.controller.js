const accountModel = require('../models/account.model');



async function createAccountController(req, res) {
    const userId = req.user._id; // Assuming the user ID is available in the request object
    
    const account =await accountModel.create({
        user:userId
    });
    res.status(201).json({message:"Account created successfully",account})

}
module.exports
={createAccountController}  