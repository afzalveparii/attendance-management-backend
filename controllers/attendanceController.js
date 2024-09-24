import Attendance from '../models/attendanceModel.js';

// 1. Real-Time Insight API
export const getRealTimeInsight = (req, res) => {
try {
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formattedDate = `${day}${getOrdinalSuffix(day)}, ${month}, ${year}`;
    res.status(200).json({ message: 'Real-time insight fetched', time: currentTime, date: formattedDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
        const { date, department, status, search, page = 1, limit = 10 } = req.query;
        let query = {};
        if (!date) {
          return res.status(400).json({ message: 'Date is required' });
        }
    
        if (date) {
          const parsedDate = new Date(date);
          if (isNaN(parsedDate)) {
            return res.status(400).json({ message: 'Invalid date format' });
          }
          query.date = parsedDate;
        }
        if (department) query.department = department;
        if (status) query.status = status;
        if (search) {
          query.$or = [
            { employeeName: { $regex: search, $options: 'i' } },
            { employeeId: { $regex: search, $options: 'i' } },
          ];
        }
    
        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          sort: { date: -1 }
        };
    
        const result = await Attendance.paginate(query, options);
        
        if (result.docs.length === 0) {
          return res.status(404).json({ message: 'Data not found for the given date' });
        }
    
        res.status(200).json({
          message: 'Attendance overview fetched',
          data: result.docs,
          pagination: {
            totalRecords: result.totalDocs,
            totalPages: result.totalPages,
            currentPage: result.page,
            pageSize: result.limit
          }
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};