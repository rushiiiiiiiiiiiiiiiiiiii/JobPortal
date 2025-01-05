const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
  userid:String,
  title:String,
  desc:String,
  location:String,
  cname:String,
  image:String,
  detail:String
})
const JobModel = mongoose.model("jobport", JobSchema)
module.exports = JobModel;

 {/* {[...Array(9)].map((_, index) => {
            const job = {
              title: "Data Scientist",
              company: "Apple",
              location: "Maharashtra",
              description:
                "Apple is seeking an experienced Data Scientist to join our analytics team.",
              logo: "./public/image/amazon.svg",
            }; */}