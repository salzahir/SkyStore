import { Router } from "express";
import * as folderController from "../controllers/foldercontroller.js";
import * as viewsController from "../controllers/viewscontroller.js";
import * as authController from "../controllers/authcontroller.js";

const router = Router();

// All folder routes require authentication
router.use(authController.ensureAuth);

// Folder operations
router.post("/create-folder", folderController.handleCreateFolder);
router.get("/folder/:id", viewsController.renderFolderDashboard);

export default router;