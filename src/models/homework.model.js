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
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    supportMaterial: [
      {
        type: Schema.Types.ObjectId,
        ref: "SupportMaterial",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Homework = model("Homework", homeworkSchema);
module.exports = Homework;
