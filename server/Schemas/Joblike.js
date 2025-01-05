const mongoose = require('mongoose')
const joblikeSchema = new mongoose.Schema({
    uid:String,
    jobid:String
})
const JoblikeModel = mongoose.model('joblikes', joblikeSchema)
module.exports = JoblikeModel