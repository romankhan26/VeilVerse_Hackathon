// index.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
dotenv.config() //  Load .env before using process.env
// console.log(process.env, ">>>>>>>>>>>>>>>>>>>")
const app = express();

//  Middleware
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses form data

const allowedOrigins = [
  "http://localhost:5173",
  "https://veil-verse-hackathon.vercel.app/"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
})); // Enables CORS (Cross-Origin Resource Sharing)
//  Connect to MongoDB
dbConnection();

//  Test Route
app.get('/', (req, res) => {
    
  res.send('<h1>Server is running!</h1>');
});
app.use("/api/auth",authRoutes)
app.use("/api/users", userRoutes);
app.use('/api/hijabs', reviewsRoutes);
// app.use("/api/feedbacks",feedbackRoutes)
//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}`)
);
// https://demos.themeselection.com/materio-mui-nextjs-admin-template-free/demo\
// https://prium.github.io/twbs-sparrow/v2.4.2/
// https://themewagon.github.io/kaira/
// https://themewagon.github.io/shopmax/