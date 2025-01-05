const mongoose =require('mongoose')
const ResumeSummarySchema = new mongoose.Schema({
    summary:String


})
const ResumeSummaryModel = mongoose.model("resumesummary", ResumeSummarySchema)
module.exports = ResumeSummaryModel

