const mongoose =require('mongoose')

    const ResumePersnolSchema = new mongoose.Schema({
        // resumeId:{type:String, required:true, unique:true},
        resumename:{ type: String, required: true,required:true },
        firstName: { type: String, required: true, maxlength: 50 },
        lastName: { type: String, required: true, maxlength: 50 },
        jobTitle: { type: String, maxlength: 100 },
        address: { type: String, maxlength: 300 },
        phone: { type: String, required: true},
        email: { type: String, required: true},
        summary: { type: String, maxlength: 1000 },
        PositionTitle: { type: String, maxlength: 100 },
        CompanyName: { type: String, maxlength: 100 },
        City: { type: String, maxlength: 50 },
        State: { type: String, maxlength: 50 },
        StartDate: { type: Date },
        EndDate: { type: Date },
        Desc: { type: String, maxlength: 500 },
        UniversityName: { type: String, maxlength: 100 },
        Degree: { type: String, maxlength: 50 },
        Major: { type: String, maxlength: 100 },
        StartDateEdu: { type: Date },
        EndDateEdu: { type: Date },
        DescriptionEdu: { type: String, maxlength: 500 },
        skills:[String]
    });
    
const ResumePersnolModel = mongoose.model("resumepersnol", ResumePersnolSchema)
module.exports = ResumePersnolModel

