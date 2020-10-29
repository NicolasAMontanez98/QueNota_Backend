const homeworkCtrl = {};

const Homework = require("../models/homework.model");

homeworkCtrl.getHomeworksByCourse = async (req, res) => {
  try {
    const homeworks = await Homework.find({ course: req.params.id });
    if (homeworks) {
      res.status(200).send(homeworks);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

homeworkCtrl.getHomeworksByStudent = async (req, res) => {
  try {
    const homeworks = await Homework.find({ student: req.params.id })
      .populate({ path: "course", select: "title students subject" })
      .populate({
        path: "notes",
        select: "isQualified observations qualification",
      });
    if (homeworks) {
      console.log(homeworks);
      res.status(200).send(homeworks);
    } else {
      throw new Error("Verifique que esté inscrito en el curso.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

homeworkCtrl.getHomeworksByTeacher = async (req, res) => {
  try {
    const homeworks = await Homework.find({ teacher: req.params.id })
      .populate({
        path: "course",
        select: "title students subject",
        populate: { path: "students", model: "Student" },
      })
      .populate({ path: "teacher", select: "_id names lastNames phone email" })
      .populate({
        path: "notes",
        select: "isQualified observations qualification",
      });
    if (homeworks) {
      res.status(200).send(homeworks);
    } else {
      throw new Error("Verifique que el curso tenga tareas");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

homeworkCtrl.addHomework = async (req, res) => {
  try {
    const homework = new Homework({
      teacher: req.body.teacher,
      course: req.body.course,
      title: req.body.title,
      subject: req.body.subject,
      deliveryDate: req.body.deliveryDate,
      description: req.body.description,
    });
    const newHomework = await homework.save();
    if (newHomework) {
      res.status(200).send({
        message: "Tarea guardada con exito",
        data: newHomework,
      });
    } else {
      throw new Error("No se ha podido agregar la tarea.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

homeworkCtrl.updateHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (homework) {
      homework.teacher = req.body.teacher || homework.teacher;
      homework.course = req.body.course || homework.course;
      homework.title = req.body.title || homework.title;
      homework.subject = req.body.subject || homework.subject;
      homework.deliveryDate = req.body.deliveryDate || homework.deliveryDate;
      homework.description = req.body.description || homework.description;
      const updatedHomework = await homework.save(homework);
      if (updatedHomework) {
        res.status(200).send({ message: "Tarea actualizada con exito" });
      }
    }
    const updatedHomework = new Homework({
      teacher: req.body.teacher,
      course: req.body.course,
      title: req.body.title,
      subject: req.body.subject,
      deliveryDate: req.body.deliveryDate,
      description: req.body.description,
    });
    const newHomework = await homework.save();
    if (newHomework) {
      res.status(200).send({
        message: "Tarea guardada con exito",
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

homeworkCtrl.deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Tarea borrada exitosamente" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

homeworkCtrl.addSupportMaterial = async (req, res) => {
  try {
    console.log(req.body);
    const { title, material } = req.body;
    const homework = await Homework.findById(req.params.id);
    if (homework) {
      homework.supportMaterial.push({
        title: title,
        file: material,
      });
      homework.save();
      res.status(200).send({ message: "Material agregado exitosamente." });
    } else {
      throw new Error("La tarea no existe.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

module.exports = homeworkCtrl;
