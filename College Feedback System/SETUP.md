# College Feedback System

A complete feedback system with Spring Boot backend and React frontend featuring role-based authentication.

## Features

- **Secure Authentication**: JWT-based login with bcrypt password hashing
- **Role-Based Access**: Student, Faculty, and Admin roles with different permissions
- **Feedback Management**: Submit feedback on courses, faculty, and facilities
- **Anonymous Feedback**: Option to submit feedback anonymously
- **Real-time Dashboard**: Role-specific dashboards with relevant features
- **Responsive Design**: Modern React frontend with clean UI

## Default Users

- **Admin**: username: `admin`, password: `admin123`
- **Faculty**: username: `faculty1`, password: `faculty123`
- **Student**: username: `student1`, password: `student123`

## Quick Start

### Production Environment
```bash
./start-production.sh
```

### Local Development
```bash
./start-system.sh
```

### Option 2: Manual setup

#### Backend Setup (Spring Boot)
1. Navigate to springapp directory:
   ```bash
   cd springapp
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

Backend will start on port 8080

#### Frontend Setup (React)
1. Navigate to reactapp directory:
   ```bash
   cd reactapp
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

Frontend will start on port 8081

## API Endpoints

### Swagger Documentation
- **Swagger UI**: https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io/swagger-ui.html
- **API Docs**: https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io/v3/api-docs

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Feedback
- `GET /api/feedback` - Get all feedback (Faculty/Admin)
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/my` - Get user's feedback (Student)
- `GET /api/feedback/analytics` - Get feedback analytics (Faculty/Admin)

## Role Permissions

- **Student**: Submit feedback, view own feedback
- **Faculty**: View all feedback, access analytics
- **Admin**: Full access to all features, user management

## How to Use

1. **Start the system** using `./start-production.sh` for production or `./start-system.sh` for local development
2. **Open browser** and go to:
   - Production: https://8081-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io
   - Local: http://localhost:3000
3. **Login** with one of the default accounts:
   - Admin: `admin` / `admin123`
   - Faculty: `faculty1` / `faculty123`
   - Student: `student1` / `student123`
4. **Register new users** using the registration form
5. **Submit feedback** (Students can submit, Faculty/Admin can view all)

## Technology Stack

### Backend
- Spring Boot 3.4.0
- Spring Security with JWT
- Spring Data JPA
- H2 Database (in-memory)
- BCrypt password encoding
- CORS enabled for frontend integration

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Context API for state management
- CSS3 for styling
- JWT token management