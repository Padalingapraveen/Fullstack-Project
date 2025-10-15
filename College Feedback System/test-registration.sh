#!/bin/bash

echo "Testing registration endpoint..."

# Start backend in background
cd springapp
mvn spring-boot:run > /dev/null 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 15

# Test registration
echo "Testing user registration..."
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "test123",
    "email": "test@example.com",
    "role": "STUDENT"
  }'

echo ""
echo "Testing login with registered user..."
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "test123"
  }'

echo ""
echo "Stopping backend..."
kill $BACKEND_PID

echo "Test completed!"