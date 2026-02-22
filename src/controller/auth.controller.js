const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');  
/**
 * - user register controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {
    const { email, password, name } = req.body;
    const isExist = await userModel.findOne({ email });

    if (isExist) {
        return res.status(400).json({ message: "Email already exists", status: "failed" });
    }

    const user = await userModel.create({
        email,
        password,
        name
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, { expiresIn: '3d' });

    res.cookie('token', token);

    // ✅ Send email BEFORE returning the response
    await emailService.sendRegistrationEmail(user.email, user.name);

    return res.status(201).json({
        message: "User registered successfully",
        status: "success",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token
    });
}

async function userLoginController(req, res) {
    const{email,password}=req.body;  

    const user =await userModel.findOne({email}).select('+password');//requried when select:false in user model
    if(!user){
        return res.status(404).json({message:"User not found",status:"failed"});
    }
    const isValidPassword=await user.comparePassword(password);
    if(!isValidPassword){
        return res.status(401).json({message:"Invalid password",status:"failed"});
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, { expiresIn: '3d' });
    res.cookie('token', token);

    return res.status(201).json({
        message: "User logged in successfully",
        status: "success",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token
    })


}
module.exports = { userRegisterController, userLoginController };