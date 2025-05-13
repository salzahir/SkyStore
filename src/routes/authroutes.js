// authroutes.js

import { Router } from "express";
import * as authController from "../controllers/authcontroller.js"
import * as viewsController from "../controllers/viewscontroller.js"
import * as folderController from "../controllers/foldercontroller.js"
import * as passwordController from "../controllers/passwordcontroller.js"
import * as fileController from "../controllers/filecontroller.js"
import validForm from "../utils/validation.js"

const router = Router()

// Root & General
router.get("/", viewsController.renderRoot);
router.get("/terms", viewsController.renderTerms);

// Password management routes
router.get("/forgot-password", viewsController.renderForgotPassword);
router.post("/forgot-password", passwordController.handleRecoverPassword);
router.get("/reset-password/:token", viewsController.renderResetPassword);
router.post("/reset-password/:token", passwordController.handleResetPasword);

// Auth Pages
router.get("/login", viewsController.renderLogin);
router.post("/login", authController.handleLogin);
router.get("/logout", authController.handleLogout);

router.get("/register", viewsController.renderRegister);
router.post("/register", validForm, authController.handleRegister);

// Protected User Pages
router.get("/dashboard", authController.ensureAuth, viewsController.renderDashboard);

router.get("/dashboard/file/:id", authController.ensureAuth, viewsController.renderFile);
router.post("/dashboard/file/:id", authController.ensureAuth, fileController.handleDeleteFile);

export default router;