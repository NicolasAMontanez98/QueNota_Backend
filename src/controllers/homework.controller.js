const homeworkCtrl = {};

const Homework = require("../models/homework.model");

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
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
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

homeworkCtrl.removeHomework = async (req, res) => {
  try {
    const homework = await findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Tarea borrada exitosamente" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

module.exports = homeworkCtrl;
