const router = require("express").Router();
const {
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

router.route("/add").post(addCourse);
router.route("/update/:id").put(updateCourse);
router.route("/delete/:id").delete(deleteCourse);

module.exports = router;
