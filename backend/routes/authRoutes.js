import { Router } from "express";
import { signupHandler,signInHandler, forgotPswdHandler, ResetPswdHandler, profile } from "../controllers/authController.js";
import { middlewareToProtect } from "../middlewares/authMiddleware.js";
const router = Router()
router.post("/signup",signupHandler)
router.post("/signin",signInHandler)

router.post("/forgot-password", forgotPswdHandler);
router.post("/reset-password", ResetPswdHandler);
router.get("/profile", middlewareToProtect , profile);
export default router