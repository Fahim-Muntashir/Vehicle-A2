import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const result = await authServices.signupUser(req.body);

    console.log(result);
    return res.status(201).json({
      success: "true",
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a new user

    const result = await authServices.loginUserIntoDB(
      req.body.email,
      req.body.password
    );
    return res.status(201).json({
      success: "true",
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

export const authController = {
  loginUser,
  signupUser,
};
