const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    names: {
      type: String,
      required: true,
    },
    lastNames: {
      type: String,
      required: true,
    },
    idNumberStudent: {
      type: String,
      required: true,
      unique: true,
    },
    birthDateStudent: {
      type: String,
      required: true,
    },
    namesTutor: {
      type: String,
      required: true,
    },
    lastNames: {
      type: String,
      required: true,
    },
    idTypeTutor: {
      type: String,
      required: true,
    },
    idNumberTutor: {
      type: Number,
      required: true,
      unique: true,
    },
    birthDateTutor: {
      type: String,
      required: true,
    },
    emailStudent: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    emailTutor: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    school: {
      type: String,
      required: true,
    },
    pictureProfile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);
module.exports = Student;
