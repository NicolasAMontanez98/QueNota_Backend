const router = require("express").Router();
const {
  addStudent,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getCoursesByTeacher,
  getCoursesByStudent,
  getCoursesByName,
} = require("../controllers/course.controller");

router.route("/add-student").post(addStudent);
router.route("/").get(getCourses);
router.route("/name").get(getCoursesByName);
router.route("/teacher/:id").get(getCoursesByTeacher);
router.route("/student/:id").get(getCoursesByStudent);
router.route("/add").post(addCourse);
router.route("/update/:id").put(updateCourse);
router.route("/delete/:id").delete(deleteCourse);

module.exports = router;
