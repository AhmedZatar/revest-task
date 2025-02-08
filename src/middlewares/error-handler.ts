import {Request, Response} from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
  console.error("Error:", err.message || err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
