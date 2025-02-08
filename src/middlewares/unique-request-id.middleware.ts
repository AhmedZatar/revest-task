import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    requestId?: string;
}

const uniqueRequestId = (req: CustomRequest, res: Response, next: NextFunction): void => {
    req.requestId = uuidv4();
    next();
};

export default uniqueRequestId;