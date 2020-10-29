const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    homework: {
      type: Schema.Types.ObjectId,
      ref: "Homework",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    qualification: {
      type: Number,
      required: true,
    },
    observations: {
      type: String,
    },
    isQualified: {
      type: Boolean,
      default: false,
    },
    files: [
      {
        title: { type: String },
        file: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);
module.exports = Note;
