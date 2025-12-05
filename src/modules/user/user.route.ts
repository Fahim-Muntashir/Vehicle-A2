import { Router } from "express";
import { userController } from "./user.controller";
import verify from "../../middleware/verify";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userController.createUser);
router.get("/", auth(), userController.getAllUser);

export const userRoute = router;
