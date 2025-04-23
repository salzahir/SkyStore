const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authcontroller")
const {validForm} = require("../utils/validation")

router.get("/", authController.renderRoot)
router.get("/login", authController.renderLogin)
router.get("/dashboard", authController.ensureAuth, authController.renderDashboard)
router.post("/login", authController.handleLogin)
router.get("/logout", authController.handleLogout)
router.get("/register", authController.renderRegister)
router.post("/register", validForm, authController.handleRegister)
router.get("/terms", authController.renderTerms);

module.exports = router