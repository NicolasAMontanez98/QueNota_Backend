const router = require("express").Router();
const {
  addNote,
  addFilesToNote,
  updateNote,
  getNotesByStudent,
  getNotesByCourse,
  getNotesByHomework,
  getNotesByHomeworkAndStudent,
  getNoteByStudentAndHomework,
} = require("../controllers/note.controller");
const { isAuth } = require("../util/middlewares");

router.route("/add").post(addNote);
router.route("/update/:id").put(updateNote);
router.route("/addFile/:id").post(addFilesToNote);
router.route("/student/:id").get(getNotesByStudent);
router.route("/homework/student").post(getNoteByStudentAndHomework);
router.route("/course/:id").get(getNotesByCourse);
router.route("/homework/:id").get(getNotesByHomework);
router.route("/homework_student").get(getNotesByHomeworkAndStudent);

module.exports = router;
