import { Request, Response, Router } from "express";
import { Pool } from "pg";
import { pool } from "../../database/db";
import { userServices } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const result = await userServices.getAllUser();

    console.log(result);
    return res.status(201).json({
      success: "true",
      message: "User retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const email = req.user?.email as string;
    const result = await userServices.getSingleUser(email);

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

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const result = await userServices.updateUser(id, data);

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await userServices.deleteUser(id);

    if (!result.rows.length) {
      return res.status(404).json({
        success: "false",
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

export const userController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
