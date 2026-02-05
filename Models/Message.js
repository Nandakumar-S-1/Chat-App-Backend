import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        unique:true,
        required:true,
    
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    data:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})


export default mongoose.model('Messages',MessageSchema)