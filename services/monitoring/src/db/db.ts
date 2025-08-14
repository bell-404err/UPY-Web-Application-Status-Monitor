import mongoose from 'mongoose';
import path from "path"
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import monitoringSchema from "./schema.js";

dotenv.config();

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const MONGO_URL: string = process.env.MONGO_URL;

if (!MONGO_URL) {
    throw new Error('MONGO_URL not defined in .env');
}

await mongoose.connect(MONGO_URL)
const Monitoring = mongoose.model('Monitoring', monitoringSchema);

export { Monitoring };