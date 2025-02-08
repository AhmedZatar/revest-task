import {Request, Response, NextFunction} from "express";
import Joi from "joi";

export const validate = (
  schema: Joi.ObjectSchema,
  source: "body" | "query" | "params" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req[source], {abortEarly: false});

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });

      return;
    }

    next();
  };
};

export default validate;
