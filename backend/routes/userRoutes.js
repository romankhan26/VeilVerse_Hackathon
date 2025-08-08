import { Router } from "express";
import {
  authorize,
  middlewareToProtect,
} from "../middlewares/authMiddleware.js";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getSingleUserHandler,
  updateUserHandler,
} from "../controllers/userController.js";

const router = Router();

router.get("/", middlewareToProtect, authorize("admin"), getAllUsersHandler);
router.get(
  "/:id",
  middlewareToProtect,
  authorize("admin"),
  getSingleUserHandler
);
router.put("/:id", middlewareToProtect, updateUserHandler);
router.delete("/:id", middlewareToProtect, deleteUserHandler);

export default router;
