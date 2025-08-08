import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './config/db.js';
import dbConnectMiddleware from './middlewares/dbConnectMiddleware.js';
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import reviewsRoutes from "./routes/reviewsRoutes.js"
dotenv.config();

const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://veil-verse-hackathon.vercel.app" // ✅ no slash
// ];

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(dbConnectMiddleware);
app.use("/api", dbConnectMiddleware);
app.use("/api/auth",authRoutes)
app.use("/api/users", userRoutes);
app.use('/api/hijabs', reviewsRoutes);
app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>');
});

// import your routes here...

const PORT = process.env.PORT || 5000;

(async () => {
  await dbConnection(); // ✅ connect first
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
})();
