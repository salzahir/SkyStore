const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authcontroller")

router.post("/login", authController.handleLogin)
router.get("/logout", authController.handleLogout)
router.get("/register", authController.renderRegister)
router.post("/register", authController.handleRegister)

module.exports = router