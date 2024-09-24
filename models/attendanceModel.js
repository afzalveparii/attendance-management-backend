import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: props => `${props.value} is not a valid date!`
    }
  },
  status: { type: String, enum: ['Present', 'On Leave'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });
attendanceSchema.plugin(mongoosePaginate);
const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
