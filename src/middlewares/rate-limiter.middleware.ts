import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: false,
  legacyHeaders: false,
});

export default limiter;
