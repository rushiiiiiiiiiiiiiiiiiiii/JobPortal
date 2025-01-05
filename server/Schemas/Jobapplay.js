const mongoose = require('mongoose')

const ApplaySchema = new mongoose.Schema({
    uid:String,
    jobid:String
})

const ApplayModel = mongoose.model("jobapplay", ApplaySchema)
module.exports = ApplayModel