const courseCtrl = {};

const Course = require("../models/course.model");

courseCtrl.addCourse = async (req, res) => {
  try {
    const course = new Course({
      teacher: req.body.teacher,
      subject: req.body.subject,
      title: req.body.title,
    });
    const newCourse = await course.save();
    if (newCourse) {
      res.status(200).send({ message: "Curso creado exitosamente" });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

courseCtrl.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne(req.params.id);
    if (course) {
      course.teacher = req.body.teacher || course.teacher;
      course.subject = req.body.subject || course.subject;
      course.teacher = req.body.title || course.title;
      const updatedCourse = await course.save(course);
      if (updatedCourse) {
        res.status(200).send({ message: "Curso actualizado exitosamente." });
      }
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

courseCtrl.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      res.status(200).send({ message: "Curso borrado", data: deletedCourse });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

module.exports = courseCtrl;
