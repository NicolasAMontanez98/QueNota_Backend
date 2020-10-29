const router = require("express").Router();
const {
  getAllStudents,
  getInfo,
  getInfoStudent,
  getHomeworksByStudent,
  register,
  login,
  update,
  verifyAccount,
} = require("../controllers/student.controller");
const { isAuth } = require("../util/middlewares");

router.route("/getAll").get(getAllStudents);
router.route("/:id").get(getInfo);
router.route("/detail/:id").get(getInfoStudent);
router.route("/homeworks/:id").get(getHomeworksByStudent);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update/:id").put(update);
router.route("/activate_account/:id").put(verifyAccount);

module.exports = router;
