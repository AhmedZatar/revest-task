import {Request, Response, NextFunction} from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(
      {body: req.body, query: req.query, params: req.params},
      {abortEarly: false},
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    next();
  };
};
