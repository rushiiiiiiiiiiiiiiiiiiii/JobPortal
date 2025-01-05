const mongoose =require('mongoose')
const ResumeSchema = new mongoose.Schema({
    resumename:String
})
const ResumenameModel = mongoose.model("resumename", ResumeSchema)
module.exports = ResumenameModel

