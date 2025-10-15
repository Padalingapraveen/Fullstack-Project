#!/bin/bash

echo "Starting College Feedback System for Production..."

# Start Spring Boot backend on port 8080
echo "Starting Spring Boot backend on port 8080..."
cd springapp
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Start React frontend on port 8081
echo "Starting React frontend on port 8081..."
cd ../reactapp
npm start &
FRONTEND_PID=$!

echo "System started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Frontend URL: https://8081-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io"
echo "Backend URL: https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io"
echo ""
echo "Default login credentials:"
echo "Admin: admin / admin123"
echo "Faculty: faculty1 / faculty123"
echo "Student: student1 / student123"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user interrupt
wait