#!/bin/bash

echo "Quick registration test..."

cd springapp
mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!

echo "Waiting for backend..."
sleep 10

echo "Testing registration..."
RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "pass123",
    "email": "new@test.com",
    "role": "STUDENT"
  }')

echo "Registration response: $RESPONSE"

echo "Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "pass123"
  }')

echo "Login response: $LOGIN_RESPONSE"

kill $BACKEND_PID
echo "Test complete!"