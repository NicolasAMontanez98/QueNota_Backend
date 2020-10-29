const router = require("express").Router();
const {
  addHomework,
  addSupportMaterial,
  getHomeworksByTeacher,
  getHomeworksByStudent,
  deleteHomework,
  updateHomework,
  getHomeworksByCourse,
} = require("../controllers/homework.controller");

router.route("/teacher/:id").get(getHomeworksByTeacher);
router.route("/student/:id").get(getHomeworksByStudent);
router.route("/by-course/:id").get(getHomeworksByCourse);
router.route("/add").post(addHomework);
router.route("/delete/:id").delete(deleteHomework);
router.route("/update/:id").put(updateHomework);
router.route("/add-material/:id").put(addSupportMaterial);

module.exports = router;
