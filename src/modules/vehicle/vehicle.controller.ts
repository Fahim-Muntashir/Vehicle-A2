import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const result = await vehicleServices.createVehicle(req.body);

    console.log(result);
    return res.status(201).json({
      success: "true",
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
};
