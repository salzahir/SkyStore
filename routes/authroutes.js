// authroutes.js

const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authcontroller")
const viewsController = require("../controllers/viewscontroller")
const {validForm} = require("../utils/validation")

// Root & General
router.get("/", viewsController.renderRoot);
router.get("/terms", viewsController.renderTerms);

// Auth Pages
router.get("/login", viewsController.renderLogin);
router.post("/login", authController.handleLogin);
router.get("/logout", authController.handleLogout);

router.get("/register", viewsController.renderRegister);
router.post("/register", validForm, authController.handleRegister);

// Protected User Pages
router.get("/dashboard", authController.ensureAuth, viewsController.renderDashboard);

module.exports = router