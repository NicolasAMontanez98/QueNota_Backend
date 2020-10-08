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
    mark: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);
module.exports = Note;
