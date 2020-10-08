const router = require("express").Router();
const {
  register,
  login,
  update,
  verifyAccount
} = require("../controllers/student.controller");
const { isAuth } = require("../util/middlewares");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update/:id", isAuth).put(update);
router.route("/activate_account/:id", isAuth).put(verifyAccount);

module.exports = router;
