import express from 'express';
import { getRealTimeInsight, getAttendanceComparisonChart, getAttendanceOverview } from '../controllers/attendanceController.js';

const router = express.Router();

// Define the routes for attendance management
router.get('/realtime-insight', getRealTimeInsight);
router.get('/attendance-comparison-chart', getAttendanceComparisonChart);
router.get('/attendance-overview', getAttendanceOverview);

export default router;
