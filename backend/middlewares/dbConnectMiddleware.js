// middleware/dbConnect.js
import dbConnection from "../config/db.js";

const dbConnectMiddleware = async (req, res, next) => {
  try {
    await dbConnection(); // will use cached connection if already connected
    next(); // proceed to the next middleware/route
  } catch (err) {
    console.error("DB connection error in middleware:", err.message);
    res.status(500).json({ message: "Database connection failed" });
  }
};

export default dbConnectMiddleware;
