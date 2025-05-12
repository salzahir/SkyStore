import { Router } from "express";
import * as fileController from "../controllers/filecontroller.js";
import * as viewsController from "../controllers/viewscontroller.js";
import * as authController from "../controllers/authcontroller.js";

const router = Router();

// All file routes require authentication
router.use(authController.ensureAuth);

// File operations
router.get("/dashboard/file/:id", viewsController.renderFile);
router.post("/dashboard/file/:id", fileController.handleDeleteFile);

export default router; 