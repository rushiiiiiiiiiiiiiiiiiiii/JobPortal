import mongoose from "mongoose"

const ApplaySchema = new mongoose.Schema({
    uid:String,
    jobid:String
})

const ApplayModel = mongoose.model("jobapplay", ApplaySchema)
export default ApplayModel;
