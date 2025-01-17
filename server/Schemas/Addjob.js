import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  userid: String,
  title: String,
  desc: String,
  location: String,
  cname: String,
  image: String,
  detail: String,
});

const JobModel = mongoose.model("jobport", JobSchema);

export default JobModel;
