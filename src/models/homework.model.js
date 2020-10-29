const { Schema, model } = require("mongoose");

const homeworkSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    supportMaterial: [
      {
        title: { type: String },
        file: { type: String },
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Homework = model("Homework", homeworkSchema);
module.exports = Homework;
