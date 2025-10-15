#!/bin/bash

echo "Starting College Feedback System..."
echo "Frontend will run on: https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io/"
echo "Backend will run on: https://8081-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io/"

# Start backend in background
echo "Starting Spring Boot backend..."
cd springapp
./mvnw spring-boot:run &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 10

# Start frontend
echo "Starting React frontend..."
cd ../reactapp
npm install
npm start &
FRONTEND_PID=$!

echo "Both services started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID