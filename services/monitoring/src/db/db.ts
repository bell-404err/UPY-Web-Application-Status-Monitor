import mongoose from 'mongoose';
import path from "path"
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import monitoringSchema from "./schema.js";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const MONGO_URL: string | undefined = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error('MONGO_URL not defined in .env');
}

await mongoose.connect(MONGO_URL)
export const MonitoringDB = mongoose.model('Monitoring', monitoringSchema);