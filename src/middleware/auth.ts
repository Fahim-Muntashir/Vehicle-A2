import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../modules/auth/auth.service";
import { pool } from "../database/db";

interface MyJwtPayload extends JwtPayload {
  id: number;
  role: "admin" | "customer";
  email: string;
}

const auth = (...roles: ("admin" | "customer")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      throw new Error("no token provided");
    }

    // const
    const token = tokenHeader.startsWith("Bearer ")
      ? tokenHeader.split(" ")[1]
      : tokenHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, secret) as unknown as MyJwtPayload;
    console.log("User role:", decoded.role); // check role
    console.log("Allowed roles:", roles);
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1`,
      [decoded.email]
    );

    if (user.rows.length === 0) {
      throw new Error("userNot Found");
    }
    req.user = decoded;

    if (roles.length && !roles.includes(decoded.role))
      throw new Error("you are not authorize");

    next();
  };
};

export default auth;
