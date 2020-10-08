const studentCtrl = {};

const Student = require("../models/student.model");
const { getToken, isAuth } = require("../util/middlewares");
const bcrypt = require("bcrypt");

studentCtrl.register = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 7);
    const student = new Student({
      names: req.body.names,
      lastNames: req.body.lastNames,
      idNumberStudent: req.body.idNumberStudent,
      birthDateStudent: req.body.birthDateStudent,
      namesTutor: req.body.namesTutor,
      lastNames: req.body.lastNames,
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
        email: newStudent.email,
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
    const student = await Student.findOne({ email });
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
      email: student.email,
      token: getToken(student),
    });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
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
      if (updatedTeacher) {
        res.status(200).send({
          _id: updatedTeacher._id,
          names: updatedTeacher.names,
          lastNames: updatedTeacher.lastNames,
          email: updatedTeacher.email,
          token: getToken(updatedTeacher),
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
