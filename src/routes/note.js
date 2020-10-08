const router = require("express").Router();
const {
  addNote,
  getNotesByStudent,
  getNotesByCourse,
  getNotesByHomework,
  getNotesByHomeworkAndStudent,
} = require("../controllers/note.controller");
const { isAuth } = require("../util/middlewares");

router.route("/add", isAuth).post(addNote);
router.route("/student/:id", isAuth).get(getNotesByStudent);
router.route("/course/:id", isAuth).get(getNotesByCourse);
router.route("/homework/:id", isAuth).get(getNotesByHomework);
router.route("/homework_student", isAuth).get(getNotesByHomeworkAndStudent);

module.exports = router;
