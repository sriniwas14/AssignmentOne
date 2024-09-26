import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import authRouter from "../routes/auth";

async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  if (err instanceof ZodError) {
    const firstErr = err.errors[0];
    res.status(401).send({
      success: false,
      message: `Field '${firstErr.path}' is ${firstErr.message}`,
    });
  } else {
    res.status(500).send({
      status: false,
      message: "something went wrong!",
    });
  }
}

export default errorHandler;
