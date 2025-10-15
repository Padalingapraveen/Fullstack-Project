#!/bin/bash

echo "Starting College Feedback System..."

# Start Spring Boot backend
echo "Starting Spring Boot backend on port 8080..."
cd springapp
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Start React frontend
echo "Starting React frontend on port 3000..."
cd ../reactapp
npm start &
FRONTEND_PID=$!

echo "System started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Access the application at: http://localhost:3000"
echo "Backend API at: http://localhost:8080"
echo ""
echo "Default login credentials:"
echo "Admin: admin / admin123"
echo "Faculty: faculty1 / faculty123"
echo "Student: student1 / student123"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user interrupt
wait