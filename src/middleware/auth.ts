import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../modules/auth/auth.service";
import { pool } from "../database/db";

const auth = (...roles: ("admin" | "user")[]) => {
  console.log(roles);

  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("no token provided");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1`,
      [decoded.email]
    );

    if (user.rows.length === 0) {
      throw new Error("userNot Found");
    }
    req.user = decoded;

    if (roles.length && roles.includes(decoded.role))
      throw new Error("you are not authorize");

    next();
  };
};

export default auth;
