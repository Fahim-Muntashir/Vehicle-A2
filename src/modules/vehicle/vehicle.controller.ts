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

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const vehicles = await vehicleServices.getAllVehicles();

    if (vehicles.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: vehicles,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.vehicleId);

    const vehicle = await vehicleServices.getVehicleById(id);
    if (!vehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: vehicle,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.vehicleId);

    const payload = req.body;
    delete payload.registration_number;
    const vehicle = await vehicleServices.updateVehicle(id, payload);

    if (!vehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.vehicleId);
    console.log(id);
    await vehicleServices.deleteVehicle(id);
    return res.status(200).json({
      success: "true",
      message: "Vehicle deleted successfully",
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
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
