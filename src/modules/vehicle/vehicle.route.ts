import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();

router.post("/", auth(Roles.admin), vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getVehicleById);
router.put("/:vehicleId", vehicleController.updateVehicle);
router.delete(
  "/:vehicleId",
  auth(Roles.admin),
  vehicleController.deleteVehicle
);

export const vehicleRoute = router;
