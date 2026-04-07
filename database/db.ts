
// import mongoose from "mongoose";
import config from "./index";
// import { logger } from "../utils/logger";


// export const connectDB = async (): Promise<void> => {

//     let isConnected = false;

//     try {

//         if (isConnected) {
//             return; // already connected
//         }

//         const conn = await mongoose.connect(config.MONGODB_URI);

//         isConnected = true;

//         logger.info(`MongoDB Connected: ${conn.connection.host}`);

//         // Handle MongoDB connection events
//         mongoose.connection.on("error", (err) => {
//             logger.error(`MongoDB connection error: ${err}`);
//         });

//         mongoose.connection.on("disconnected", () => {
//             logger.warn("MongoDB disconnected, trying to reconnect...");
//         });

//         mongoose.connection.on("reconnected", () => {
//             logger.info("MongoDB reconnected");
//         });

//         // Handle application termination
//         // process.on("SIGINT", async () => {
//         //     await mongoose.connection.close();
//         //     logger.info("MongoDB connection closed due to app termination");
//         //     process.exit(0);
//         // });
//     } catch (error) {
//         logger.error(
//             `Error connecting to MongoDB: ${error instanceof Error ? error.message : "Unknown error"
//             }`
//         );
//         process.exit(1);
//     }
// };



import mongoose from 'mongoose';

const MONGODB_URI = config.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('MongoDB connection error. Please make sure MongoDB is running. ' + e);
        throw e;
    }

    console.info('Connected to MongoDB');
    return cached.conn;
}