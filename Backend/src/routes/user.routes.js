import { Router } from "express";
import {
    createEmployee,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router
    .route("/employees")
    .post(verifyJWT, upload.single("avatar"), createEmployee);

export default router;
