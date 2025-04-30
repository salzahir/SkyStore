import { Router } from "express"
import upload from "../utils/multer.js"
import * as uploadController from "../controllers/uploadcontroller.js"

const router = Router()

router.get("/upload", uploadController.renderUpload);
router.post("/upload", upload.single('file'), uploadController.postUpload);

export default router;