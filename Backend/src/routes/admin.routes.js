import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import {
    deleteEmployee,
    editEmployee,
    getAllEmployees,
} from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/edit/:id")
    .patch(verifyAdminJWT, upload.single("avatar"), editEmployee);

router.route("/delete/:id").delete(verifyAdminJWT, deleteEmployee);
router.route("/all-employees").get(verifyAdminJWT, getAllEmployees);

export default router;
