const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authcontroller")
const {validForm} = require("../utils/validation")

router.post("/login", authController.handleLogin)
router.get("/logout", authController.handleLogout)
router.get("/register", authController.renderRegister)
router.post("/register", validForm, authController.handleRegister)

module.exports = router