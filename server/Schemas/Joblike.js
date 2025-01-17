import mongoose from 'mongoose';

const joblikeSchema = new mongoose.Schema({
    uid:String,
    jobid:String
})
const JoblikeModel = mongoose.model('joblikes', joblikeSchema)
export default JoblikeModel;
