import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import attendanceRoutes from './routes/attendanceRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(bodyParser.json());

// Use attendance routes
app.use('/api', attendanceRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
