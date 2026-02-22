const mongoose = require('mongoose');
const ledgerSchema = new mongoose.Schema({
   
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required:[true,"Account is required"],
        index:true,
        immutable:true// Once set, the account reference cannot be changed
     },
    amount:{
        type:Number,
        required:[true,"Amount is required"],
        min:[0.01,"Amount must be greater than zero"],
        immutable:true// Once set, the amount cannot be changed

    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required:[true,"Transaction is required"],
        index:true,
        immutable:true// Once set, the transaction reference cannot be changed
    },
    type:{
        type:String,
        enum:{  
            values:['DEBIT','CREDIT'],
            message:'Type must be either DEBIT or CREDIT'
        },
        required:[true,"Type is required"]
    }
},
{
        timestamps:true
})

function preventLedgerModification(){
throw new Error("Ledger entries cannot be modified once created");
}
ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('update', preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);



const ledgerModel = mongoose.model('Ledger', ledgerSchema);
module.exports = ledgerModel;