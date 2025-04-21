const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authcontroller")

router.post("/login", authController.handleLogin)
router.get("/logout", authController.handleLogout)

module.exports = router