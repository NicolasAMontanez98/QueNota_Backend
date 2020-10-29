const { Schema, model } = require("mongoose");

const teacherSchema = new Schema(
  {
    names: {
      type: String,
      required: true,
    },
    lastNames: {
      type: String,
      required: true,
    },
    idType: {
      type: String,
      required: true,
    },
    idNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pictureProfile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;
