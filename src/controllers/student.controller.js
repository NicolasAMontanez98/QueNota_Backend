const studentCtrl = {};

const Student = require("../models/student.model");
const { getToken } = require("../util/middlewares");
const bcrypt = require("bcrypt");

studentCtrl.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, "_id names lastNames");
    if (students) {
      res.status(200).send(students);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
}; 

studentCtrl.getInfo = async (req, res) => {
  try {
    const student = await Student.findById(
      req.params.id,
      "idNumberStudent birthDateStudent namesTutor lastNamesTutor idTypeTutor idNumberTutor birthDateTutor emailTutor school pictureProfile homeworks"
    ).populate('homeworks');
    if (student) {
      res.status(200).send(student); 
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

studentCtrl.getInfoStudent = async (req, res) => {
  try {
    const student = await Student.findById(
      req.params.id,
      "names lastNames pictureProfile"
    );
    if (student) {
      res.status(200).send(student);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

studentCtrl.getHomeworksByStudent = async (req, res) => {
  try {
    const homeworks = await Student.findById(
      req.params.id,
      "homeworks"
    ).populate({
      path: "homeworks",
      select:
        "_id course deliveryDate description subject supportMaterial teacher title",
      model: "Homework",
      populate: [
        {
          path: "teacher",
          select: "_id names lastNames phone email",
        },
        {
          path: "course",
          select: "_id title students subject",
        },
      ],
    });
    if (homeworks) {
      res.status(200).send(homeworks);
    } else {
      throw new Error("El estudiante no tiene tareas.");
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

studentCtrl.register = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 7);
    const student = new Student({
      names: req.body.names,
      lastNames: req.body.lastNames,
      idNumberStudent: req.body.idNumberStudent,
      birthDateStudent: req.body.birthDateStudent,
      namesTutor: req.body.namesTutor,
      lastNamesTutor: req.body.lastNamesTutor,
      idTypeTutor: req.body.idTypeTutor,
      idNumberTutor: req.body.idNumberTutor,
      birthDateTutor: req.body.birthDateTutor,
      emailStudent: req.body.emailStudent,
      emailTutor: req.body.emailTutor,
      school: req.body.school,
      pictureProfile: req.body.pictureProfile,
      password: encryptedPassword,
    });
    const newStudent = await student.save();
    if (newStudent) {
      res.status(200).send({
        _id: newStudent._id,
        names: newStudent.names,
        lastNames: newStudent.lastNames,
        email: newStudent.emailStudent,
        token: getToken(newStudent),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

studentCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ emailStudent: email });
    if (!student) {
      throw new Error("El alumno no existe");
    }
    const isValid = bcrypt.compare(password, student.password);
    if (!isValid) {
      throw new Error("Contraseña incorrecta");
    }
    res.status(200).send({
      _id: student._id,
      names: student.names,
      lastNames: student.lastNames,
      email: student.emailStudent,
      token: getToken(student),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

studentCtrl.update = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.names = req.body.names || student.names;
      student.lastNames = req.body.lastNames || student.lastNames;
      student.idType = req.body.idType || student.idType;
      student.idNumber = req.body.idNumber || student.idNumber;
      student.birthDate = req.body.birthDate || student.birthDate;
      student.phone = req.body.phone || student.phone;
      student.pictureProfile =
        req.body.pictureProfile || student.pictureProfile;
      student.email = req.body.email || student.email;
      const updatedStudent = await student.save(student);
      if (updatedStudent) {
        res.status(200).send({
          _id: updatedStudent._id,
          names: updatedStudent.names,
          lastNames: updatedStudent.lastNames,
          email: updatedStudent.emailStudent,
          token: getToken(updatedStudent),
        });
      }
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

studentCtrl.verifyAccount = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.isVerified = true;
      const verifiedStudent = await student.save();
      res.status(200).send({
        message: "Profesor verificado con exito",
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

module.exports = studentCtrl;
