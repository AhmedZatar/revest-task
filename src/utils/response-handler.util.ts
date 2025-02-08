import {Response} from "express";

export default {
  success: (res: Response, data: any, message = "Success", status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  },
  notFound: (res: Response, message = "Resource not found") => {
    return res.status(404).json({
      success: false,
      message,
    });
  },
  badRequest: (res: Response, message = "Bad request") => {
    return res.status(400).json({
      success: false,
      message,
    });
  },
};
