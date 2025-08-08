import mongoose from "mongoose";

let isConnected = false;

const dbConnection = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ecomdb",
      // Optional: newer connection tuning
      maxPoolSize: 10, // controls connection pool size
      serverSelectionTimeoutMS: 5000, // fail fast if DB down
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`✅ DB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ ERROR in DB CONNECTION:", err.message);
    throw err;
  }
};

export default dbConnection;
