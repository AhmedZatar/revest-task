import {Request, Response, NextFunction} from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", err.message || err);

  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  } else {
    next(err);
  }
};

export default errorHandler;
