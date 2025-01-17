import mongoose from 'mongoose';
const ResumeSchema = new mongoose.Schema({
    resumename:String
})
const ResumenameModel = mongoose.model("resumename", ResumeSchema)
export default ResumenameModel;

