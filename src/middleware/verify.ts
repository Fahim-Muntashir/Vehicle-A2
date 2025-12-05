import { NextFunction, Request, Response } from "express";

const verify = (req: Request, res: Response, next: NextFunction) => {
  console.log(" Bahi id card anchis ");
};

export default verify;
