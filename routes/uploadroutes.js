const {Router} = require("express")
const router = Router()
const upload = require("../utils/multer")
const uploadController = require("../controllers/uploadcontroller")

router.get("/upload", uploadController.renderUpload);
router.post("/upload", upload.single('file'), uploadController.postUpload);

module.exports = router