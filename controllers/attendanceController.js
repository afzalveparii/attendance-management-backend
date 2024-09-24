import Attendance from '../models/attendanceModel.js';

// 1. Real-Time Insight API
export const getRealTimeInsight = (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.status(200).json({ message: 'Real-time insight fetched', time: currentTime });
};

// 2. Attendance Comparison Chart API
export const getAttendanceComparisonChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const attendanceData = await Attendance.aggregate([
      { $match: { date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dayOfMonth: '$date' },
          attendanceRate: { $avg: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({ message: 'Attendance data fetched', data: attendanceData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Attendance Overview API
export const getAttendanceOverview = async (req, res) => {
  try {
    const { date, department, status } = req.query;
    
    const filters = {};
    if (date) filters.date = new Date(date);
    if (department) filters.department = department;
    if (status) filters.status = status;
    
    const attendanceOverview = await Attendance.find(filters).select('-__v'); // Excluding __v for optimized response
    res.status(200).json({ message: 'Attendance overview fetched', data: attendanceOverview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
