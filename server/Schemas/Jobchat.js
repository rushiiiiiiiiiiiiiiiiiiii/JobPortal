const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    uid:String,
    rid:String,
    message:String
})

const ChatModel = mongoose.model("jobchat", ChatSchema)
module.exports = ChatModel