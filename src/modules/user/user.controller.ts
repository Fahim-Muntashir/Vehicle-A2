import { Request, Response, Router } from "express";
import { Pool } from "pg";
import { pool } from "../../database/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const result = await userServices.createUserIntoDB(req.body);

    console.log(result);
    return res.status(201).json({
      success: "true",
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const result = await userServices.getAllUser();

    console.log(result);
    return res.status(201).json({
      success: "true",
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
};
