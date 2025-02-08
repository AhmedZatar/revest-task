import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import config from "./config";
import {
  limiter,
  uniqueRequestId,
  errorHandler,
  notFoundHandler,
} from "./middlewares";
import routes from "./routes";
import {prisma} from "./utils";

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

app.use("/api", routes);
app.use(notFoundHandler);

const startServer = async () => {
  try {
    console.log("🔄 Checking database connection...");
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
