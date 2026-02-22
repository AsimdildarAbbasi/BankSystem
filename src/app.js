const express= require('express');
const cokieParser=require('cookie-parser');
//creation of server nad manage 
const app = express();

app.use(express.json());// Middleware to parse JSON request bodies
app.use(cokieParser());

//routes 
const authRoutes=require('./routes/auth.routes');
const accountRouter=require('./routes/account.routes');
const transactionRoute=require('./routes/transaction.route');

//use routes
app.use("/api/auth",authRoutes);
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRoute)

module.exports = app;
