# 🚀 Attendance Management Backend (HRM Project)

This project is a backend system built with Node.js, Express.js, and MongoDB for managing attendance data as part of the HRM (Human Resource Management) system. It includes APIs for:

- Real-Time Insight ⏱️
- Attendance Comparison Chart 📊
- Attendance Overview 👥

## 🛠️ Technologies Used

- Node.js (v14 or later)
- Express.js (v4)
- MongoDB (v4 or later)
- Mongoose (ODM for MongoDB)
- ES6 Modules (import/export)

## 📁 Project Structure

- `app.js`: The main application file that sets up the Express.js server and connects to the database.
- `routes/attendance.js`: Defines the routes for the attendance management system.
- `models/Attendance.js`: Defines the schema and model for the attendance data.
- `controllers/attendanceController.js`: Contains the logic for handling attendance data.
- `utils/attendanceUtils.js`: Utility functions for attendance calculations.
- `config/db.js`: Configuration for the MongoDB connection.

## 📦 Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/attendance-management-backend.git
   cd attendance-management-backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/attendanceDB
   ```
   Adjust the `PORT` and `MONGO_URI` as needed.

## 🚀 Usage

To start the server in development mode:
```
npm run dev
``` 

To build the project:
```
npm run build
```

To run the project:
```
npm start
```

## 📝 API Endpoints
- Real-Time Insight ⏰:
    - Endpoint: /api/realtime-insight
    - Method: GET
    - Description: Fetches real-time system time for attendance insights.
    - Response Example:
```
{
  "message": "Real-time insight fetched",
    "time": "8:15:00 AM"
}
```

- Attendance Comparison Chart 📈
    - Endpoint: /api/attendance-comparison-chart
    - Method: GET
    - Description: Fetches attendance comparison chart data based on selected criteria.
    - Request Parameters:
        - startDate: string (required) - Start date for the comparison.
        - endDate: string (required) - End date for the comparison.
        - department: string (optional) - Department for comparison.
        - employeeId: string (optional) - Employee ID for comparison.
    - Response Example:
```
{
    "message": "Attendance data fetched",
    "data": [
        { "_id": 1, "attendanceRate": 0.9 },
        { "_id": 2, "attendanceRate": 0.85 }
    ]
}
```

- Attendance Overview 👥
    - Endpoint: /api/attendance-overview
    - Method: GET
    - Description: Fetches attendance overview data for the selected date range.
    - Request Parameters:
        - date: string (required) - Date for the overview.
        - department: string (optional) - Department for the overview.
        - status: string (optional) - Status for the overview.
    - Response Example:
```
{
  "message": "Attendance overview fetched",
   "data": [
        { "employeeId": "2341421", "employeeName": "Ahmed Rashdan", "role": "Help Desk Executive", "department": "IT", "date": "2024-08-01", "status": "Present" }
    ]
}
```
## 📥 Importing Dummy Data

To import the `attendancesDummyData.json` file into MongoDB for testing the API, follow these steps:

### 📚 Using `mongoimport` Tool

1. Ensure MongoDB is running on your local machine or the specified `MONGO_URI`.
2. Use the `mongoimport` tool to import the data:
   ```bash
   mongoimport --uri "mongodb://localhost:27017/attendanceDB" --collection attendances --file data/attendancesDummyData.json --jsonArray
   ```
   Adjust the `--uri` parameter if your MongoDB instance is running on a different URI.

### 📚 Using MongoDB Compass

1. Open MongoDB Compass and connect to your MongoDB instance.
2. Navigate to the `attendanceDB` database. If it doesn't exist, create it.
3. Click on the `attendances` collection. If it doesn't exist, create it.
4. Click on the `Add Data` button and select `Import File`.
5. Choose the `attendancesDummyData.json` file from your file system.
6. Ensure the `File Type` is set to `JSON` and click `Import`.

This will import the dummy data into the `attendances` collection in the `attendanceDB` database.
