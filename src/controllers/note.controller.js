const noteCtrl = {};

const Note = require("../models/note.model");
const Homework = require("../models/homework.model");
const Student = require("../models/student.model");

noteCtrl.updateNote = async (req, res) => {
  try {
    const { qualification, observations, isQualified } = req.body;
    const note = await Note.findById(req.params.id);
    if (note) {
      note.isQualified = isQualified || note.isQualified;
      note.qualification = qualification || note.qualification;
      note.observations = observations || note.observations;
      const updatedNote = await note.save();
      if (updatedNote) {
        res.status(200).send({ message: "Nota actualizada con exito." });
      } else {
        throw new Error("No se ha podido actualizar la nota.");
      }
    } else {
      throw new Error("Verifique la información");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

noteCtrl.addNote = async (req, res) => {
  try {
    const note = new Note({
      course: req.body.course,
      homework: req.body.homework,
      student: req.body.student,
      qualification: req.body.qualification || 0,
      observations: req.body.observations || "No hay observaciones.",
      isQualified: req.body.isQualified || false,
    });
    const newNote = await note.save();
    if (newNote) {
      const homework = await Homework.findById(req.body.homework);
      if (homework) {
        homework.notes.push(newNote._id);
        homework.save();
        const student = await Student.findById(req.body.student);
        if (student) {
          student.homeworks.push(req.body.homework);
          student.save();
          res.status(200).send({ message: "Nota guardada con exito" });
        } else {
          throw new Error("El estudiante no existe.");
        }
      } else {
        throw new Error("La tarea no existe.");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

noteCtrl.addFilesToNote = async (req, res) => {
  try {
    const { title, material } = req.body;
    const note = await Note.findById(req.params.id);
    if (note) {
      note.files.push({
        title: title,
        file: material,
      });
      note.save();
      res.status(200).send({ message: "Material agregado exitosamente." });
    } else {
      throw new Error(
        "No es posible agregar el material, asegurese de estar inscrito en el curso."
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

noteCtrl.getNoteByStudentAndHomework = async (req, res) => {
  try {
    const note = await Note.find({
      student: req.body.student,
      homework: req.body.homework,
    });
    if (note) {
      res.status(200).send(note);
    } else {
      throw new Error("Verifique que esté inscrito en el curso.");
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

noteCtrl.getNotesByStudent = async (req, res) => {
  try {
    const notes = await Note.find({ student: req.params.id }).populate(
      "homework"
    );
    if (notes) {
      res.status(200).send(notes);
    } else {
      throw new Error("Verifique que esté inscrito en algún curso.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

noteCtrl.getNotesByCourse = async (req, res) => {
  try {
    const notes = await Note.find({ course: req.params.id });
    if (notes) {
      res.status(200).send(notes);
    } else {
      throw new Error("Verifique que el curso exista.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

noteCtrl.getNotesByHomework = async (req, res) => {
  try {
    const notes = await Note.find({ homework: req.params.id });
    if (notes) {
      res.status(200).send(notes);
    } else {
      throw new Error("Verifique que la tarea exista.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
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
    } else {
      throw new Error("Verifique que el estudiante haga parte del curso.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = noteCtrl;
