const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    }
    subject: {
        type: String,
        required: true
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    homeworks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Homework",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);
module.exports = Course;