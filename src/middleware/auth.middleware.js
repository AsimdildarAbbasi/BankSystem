const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');



async function authMiddleware(req, res, next) {
   const token = req.cookies.token||req.header('Authorization')?.split(" ")[1];
   if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        const user = await userModel.findById(decoded.userId);      
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }                       
        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }   
};

async function authSystemMiddleware(req, res, next) { 
    const token=req.cookies.token||req.header('Authorization')?.split(" ")[1];  
if(!token){
    return res.status(401).json({ message: 'Unauthorized' });

}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await userModel.findById(decoded.userId);
    if (!user || !user.systemUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
} catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });

}

}
module.exports = {authMiddleware, authSystemMiddleware}
