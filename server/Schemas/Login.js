const mongoose = require('mongoose')
const LoginSchema = new mongoose.Schema({
    image:String,
    name:String,
    type:String,
    email:String,
    password:Number
})
const LoginModel = mongoose.model('joblogin', LoginSchema)
module.exports =  LoginModel;
