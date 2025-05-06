// authroutes.js

import { Router } from "express";
import * as authController from "../controllers/authcontroller.js"
import * as viewsController from "../controllers/viewscontroller.js"
import * as folderController from "../controllers/foldercontroller.js"
import validForm from "../utils/validation.js"

const router = Router()

// Root & General
router.get("/", viewsController.renderRoot);
router.get("/terms", viewsController.renderTerms);

router.get("/forgot-password", viewsController.renderForgotPassword);
router.post("/forgot-password", authController.handleRecoverPassword);

// Auth Pages
router.get("/login", viewsController.renderLogin);
router.post("/login", authController.handleLogin);
router.get("/logout", authController.handleLogout);

router.get("/register", viewsController.renderRegister);
router.post("/register", validForm, authController.handleRegister);

// Protected User Pages
router.get("/dashboard", authController.ensureAuth, viewsController.renderDashboard);

router.get("/dashboard/file/:id", authController.ensureAuth, viewsController.renderFile);
router.post("/dashboard/file/:id", authController.ensureAuth, authController.handleDeleteFile);

router.post("/dashboard/create-folder", authController.ensureAuth, folderController.handleCreateFolder);

router.get("/reset-password/:token", viewsController.renderResetPassword);
router.post("/reset-password/:token", authController.handleResetPasword);

export default router;