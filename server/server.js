import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection 
await connectDB();

// IMPORTANT: Order matters - cors BEFORE routes
app.use(cors({
  origin: 'https://build-my-cv-a27u.vercel.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => res.send("Server is running"));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});