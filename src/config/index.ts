import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  THIRD_PARTY_API_URL:
    process.env.THIRD_PARTY_API_URL || "https://third-party-api.com",
  THIRD_PARTY_API_TOKEN: process.env.THIRD_PARTY_API_TOKEN,
};
