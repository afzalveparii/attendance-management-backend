import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'On Leave'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
