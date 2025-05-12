import { Router } from "express";
import * as folderController from "../controllers/foldercontroller.js";
import * as viewsController from "../controllers/viewscontroller.js";
import * as authController from "../controllers/authcontroller.js";

const router = Router();

// All folder routes require authentication
router.use(authController.ensureAuth);

// Folder operations
router.post("/dashboard/create-folder", folderController.handleCreateFolder);
router.get("/dashboard/folder/:id", viewsController.renderFolderDashboard);
router.post("/dashboard/delete-folder", folderController.handleDeleteFolder);
router.get("/dashboard/folder/:id", viewsController.renderFolderDashboard);

export default router;