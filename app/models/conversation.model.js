const { default: mongoose, model } = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{type:mongoose.Types.ObjectId,ref:"user"},
    message:{type:String,},
    dataTime:{type:Number},
})


const locationSchema = new mongoose.Schema({
    sender:{type:mongoose.Types.ObjectId,ref:"user"},
    location:{type:Object,default:{}},
    dataTime:{type:Number},
})



const roomSchema = new mongoose.Schema({
    name:{type:String,},
    description:{type:String,},
    image:{type:String,},
    messages:{type:[messageSchema],default:[]},
    locations:{type:[locationSchema],default:[]},
})



const conversationSchema = new mongoose.Schema({
    title:{type:String,},
    endpoint:{type:String,},
    rooms:{type:[roomSchema],default:[]},
})




module.exports={
     ConversationModel:mongoose.model("conversation",conversationSchema)
}