const router = require("express").Router();
const {
  addHomework,
  deleteHomework,
  updateHomework,
} = require("../controllers/homework.controller");
const { isAuth } = require("../util/middlewares");

router.route("/add", isAuth).post(addHomework);
router.route("/delete/:id", isAuth).delete(deleteHomework);
router.route("/update/:id", isAuth).patch(updateHomework);

module.exports = router;
