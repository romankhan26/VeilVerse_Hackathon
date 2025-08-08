import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './config/db.js';
import dbConnectMiddleware from './middlewares/dbConnectMiddleware.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://veil-verse-hackathon.vercel.app" // ✅ no slash
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
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(dbConnectMiddleware);
app.use("/api", dbConnectMiddleware);

app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>');
});

// import your routes here...

const PORT = process.env.PORT || 5000;

(async () => {
  await dbConnection(); // ✅ connect first
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
})();
