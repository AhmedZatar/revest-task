import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import config from "./config";
import {limiter, uniqueRequestId, errorHandler} from "./middlewares";

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(uniqueRequestId);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
