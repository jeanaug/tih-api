
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT ===   "production"; 

export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];
