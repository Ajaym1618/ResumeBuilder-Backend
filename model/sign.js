const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignUpSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personalInfo: {
      firstName: String,
      lastName: String,
      jobTitle: String,
      address: String,
      nationality: String,
      phoneNumber: Number,
      email: String,
      summary: String,
      links: [String],
    },
    experience: {
      positionTitle: String,
      companyName: String,
      city: String,
      state: String,
      startDate: String,
      endDate: String,
      workSummary: String,
    },
    education: {
      schoolName: String,
      schoolLocation: String,
      startDate: String,
      endDate: String,
      degree: String,
      fieldOfStudy: String,
      percentage: String,
    },
    projects:{
        projectName: String,
        description: String,
    },
    skills: [{skill: String}],
    achievements:[
        {
          courseName: String,
          academyInstitution: String,
          startDate: String,
          endDate: String,
          location: String,
        },
      ],
    languages:[{name: String}],
    hobbies:[{name: String}]
  },
  { minimize: false }
);

module.exports = mongoose.model("SignUp", SignUpSchema);
