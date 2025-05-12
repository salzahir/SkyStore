import { Router } from "express";
import * as passwordController from "../controllers/passwordcontroller.js";
import * as viewsController from "../controllers/viewscontroller.js";

const router = Router();

// Password management routes
router.get("/forgot-password", viewsController.renderForgotPassword);
router.post("/forgot-password", passwordController.handleRecoverPassword);

router.get("/reset-password/:token", viewsController.renderResetPassword);
router.post("/reset-password/:token", passwordController.handleResetPasword);

export default router;