const mogooose=require('mongoose');

const transactionSchema=new mogooose.Schema({


    fromAccount:{
        type:mogooose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"From Account is required"],
        index:true  
    },
    toAccount:{
        type:mogooose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"To Account is required"],
        index:true      
    },
    status:{
        type:String,
        enum:{
            values:['PENDING','COMPLETED','FAILED','REVERSED'],
            message:'Status must be either PENDING, COMPLETED or FAILED',
            default:'PENDING'    
        }
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"],
        min:[0.01,"Amount must be greater than zero"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency Key is required"],  
        unique:true,
        index:true

    }
},
{
        timestamps:true
})

const transactionModel=mogooose.model("transaction",transactionSchema);
module.exports=transactionModel;
