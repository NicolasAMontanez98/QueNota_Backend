const noteCtrl = {};

const Note = require("../models/note.model");

noteCtrl.addNote = async (req, res) => {
  try {
    const note = new Note({
      course: req.body.course,
      homework: req.body.homework,
      student: req.body.student,
      mark: req.body.mark,
    });
    const newNote = await note.save();
    if (newNote) {
      res.status(200).send({ message: "Nota guardada con exito" });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

noteCtrl.getNotesByStudent = async (req, res) => {
  try {
    const notes = await Note.find({ student: req.params.id });
    if (notes) {
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

noteCtrl.getNotesByCourse = async (req, res) => {
  try {
    const notes = await Note.find({ course: req.params.id });
    if (notes) {
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

noteCtrl.getNotesByHomework = async (req, res) => {
  try {
    const notes = await Note.find({ homework: req.params.id });
    if (notes) {
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

noteCtrl.getNotesByHomeworkAndStudent = async (req, res) => {
  try {
    const notes = await Note.find({
      homework: req.body.idHomework,
      student: req.body.idStudent,
    });
    if (notes) {
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

module.exports = noteCtrl;
