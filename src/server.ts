import express, { Request, Response } from "express";
import { Pool } from "pg";
import { userRoute } from "./modules/user/user.route";
import { initDB } from "./database/db";
import { authRoute } from "./modules/auth/auth.route";
import { vehicleRoute } from "./modules/vehicle/vehicle.route";
const app = express();
app.use(express.json());

initDB();

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/vehicles", vehicleRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: " Vehicle Rental System API is running successfully!",
    path: req.path,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
