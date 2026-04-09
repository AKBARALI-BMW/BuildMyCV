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
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    try {
      callback(null, true); // Reflect all origins
    } catch (err) {
      callback(new Error(`CORS origin check failed: ${err.message}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware with error handling
app.use((req, res, next) => {
  cors(corsOptions)(req, res, (err) => {
    if (err) {
      console.error('[CORS Error]', {
        origin: req.headers.origin,
        method: req.method,
        path: req.path,
        message: err.message,
      });

      return res.status(403).json({
        error: 'CORS policy violation',
        message: err.message,
      });
    }
    next();
  });
});

// Handle preflight requests for all routes
app.options(/(.*)/, (req, res, next) => {
  cors(corsOptions)(req, res, (err) => {
    if (err) {
      console.error('[CORS Preflight Error]', {
        origin: req.headers.origin,
        path: req.path,
        message: err.message,
      });

      return res.status(403).json({
        error: 'CORS preflight failed',
        message: err.message,
      });
    }
    res.sendStatus(204); // No Content — preflight success
  });
});

app.use(express.json());

app.get('/', (req, res) => res.send("Server is running"));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});