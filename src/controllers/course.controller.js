const courseCtrl = {};

const Course = require("../models/course.model");
const Student = require("../models/student.model");

courseCtrl.addStudent = async (req, res) => {
  try {
    const studentId = req.body.id;
    const courseId = req.body.courseId;
    const course = await Course.findById({ _id: courseId });
    if (course) {
      const student = course.students.some(
        (student) => student._id === studentId
      );
      if (!student) {
        course.students.push(studentId);
        course.save();
        const student = await Student.findById(studentId);
        student.courses.push(courseId);
        student.save();
      } else {
        throw new Error("El estudiante ya fue agregado.");
      }
      res.status(200).send({ message: "Estudiante agregado con exito" });
    } else {
      throw new Error("El curso no existe.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

courseCtrl.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    if (courses) {
      res.status(200).send(courses);
    } else {
      throw new Error("No hay cursos.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

courseCtrl.getCoursesByTeacher = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.params.id })
      .populate({ path: "teacher", select: "_id names lastNames phone email" })
      .populate({ path: "students", select: "_id names lastNames" })
      .populate({ path: "notes" });
    if (courses) {
      res.status(200).send(courses);
    } else {
      throw new Error("Verifique que tenga cursos creados.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

courseCtrl.getCoursesByStudent = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.params.id })
      .populate({ path: "teacher", select: "_id names lastNames phone email" })
      .populate({ path: "students", select: "_id names lastNames" })
      .populate({ path: "notes" });
    if (courses) {
      res.status(200).send(courses);
    } else {
      throw new Error("Verifique que pertenezca a algún cursos.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

courseCtrl.getCoursesByName = async (req, res) => {
  try {
    const courses = await Course.find({ title: req.body.title })
      .populate({ path: "teacher", select: "_id names lastNames phone email" })
      .populate({ path: "students", select: "_id names lastNames" })
      .populate({ path: "notes" })
      .populate({ path: "homeworks" });
    if (courses) {
      res.status(200).send(courses);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

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
      res
        .status(200)
        .send({ message: "Curso borrado exitosamente", data: deletedCourse });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

module.exports = courseCtrl;
