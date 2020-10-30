const teacherCtrl = {};

const Teacher = require("../models/teacher.model");
const { getToken, isAuth } = require("../util/middlewares");
const bcrypt = require("bcrypt");

teacherCtrl.getInfo = async (req, res) => {
  try {
    const teacher = await Teacher.findById(
      req.params.id,
      "idType idNumber birthDate phone pictureProfile isVerified"
    );
    if (teacher) {
      res.status(200).send(teacher);
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

teacherCtrl.register = async (req, res) => {
  try {
    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 7);
    const teacher = new Teacher({
      names: req.body.names,
      lastNames: req.body.lastNames,
      idType: req.body.idType,
      idNumber: req.body.idNumber,
      birthDate: req.body.birthDate,
      phone: req.body.phone,
      pictureProfile: req.body.pictureProfile,
      email: req.body.email,
      password: encryptedPassword,
    });
    const newTeacher = await teacher.save();
    if (newTeacher) {
      res.status(200).send({
        _id: newTeacher._id,
        names: newTeacher.names,
        lastNames: newTeacher.lastNames,
        email: newTeacher.email,
        token: getToken(newTeacher),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

teacherCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw new Error("El profesor no existe");
    }
    const isValid = bcrypt.compare(password, teacher.password);
    if (!isValid) {
      throw new Error("Contraseña incorrecta");
    }
    res.status(200).send({
      _id: teacher._id,
      names: teacher.names,
      lastNames: teacher.lastNames,
      email: teacher.email,
      token: getToken(teacher),
    });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

teacherCtrl.update = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      teacher.names = req.body.names || teacher.names;
      teacher.lastNames = req.body.lastNames || teacher.lastNames;
      teacher.idType = req.body.idType || teacher.idType;
      teacher.idNumber = req.body.idNumber || teacher.idNumber;
      teacher.birthDate = req.body.birthDate || teacher.birthDate;
      teacher.phone = req.body.phone || teacher.phone;
      teacher.pictureProfile =
        req.body.pictureProfile || teacher.pictureProfile;
      teacher.email = req.body.email || teacher.email;
      const updatedTeacher = await teacher.save(teacher);
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

teacherCtrl.verifyAccount = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      teacher.isVerified = true;
      const verifiedTeacher = await teacher.save();
      res.status(200).send({
        message: "Profesor verificado con exito",
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", data: error });
  }
};

module.exports = teacherCtrl;
