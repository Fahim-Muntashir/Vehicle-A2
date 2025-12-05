import { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("no token provided");
    }
    next();
  };
};

export default auth;
