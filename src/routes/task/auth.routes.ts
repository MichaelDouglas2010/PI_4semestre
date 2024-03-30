import { Router } from "express";
import AuthController from "../../controllers/task/auth.controllers";

const authRoutes = Router()

authRoutes.post('/register',AuthController.store)
authRoutes.post('/login',AuthController.login)
authRoutes.post('/refresh',AuthController.refresh)
authRoutes.post('/logout',AuthController.logout)

export default authRoutes