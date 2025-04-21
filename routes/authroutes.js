const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authcontroller")

router.post("/login", authController.handleLogin)


module.exports = router