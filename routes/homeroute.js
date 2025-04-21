const { Router } = require("express")
const router = Router()
const homeController = require("../controllers/homecontroller")

router.get("/", homeController.renderIndex)


module.exports = router