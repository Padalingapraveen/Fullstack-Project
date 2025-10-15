# College Feedback System API Documentation

## Swagger UI Access

The API documentation is available through Swagger UI at:
- **Local Development**: http://localhost:8080/swagger-ui.html
- **Production**: https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io/swagger-ui.html

## API Endpoints

### Feedback Management

#### 1. Get All Feedbacks
- **Endpoint**: `GET /api/feedback`
- **Description**: Retrieve all feedbacks with optional filtering
- **Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 10)
  - `sort` (optional): Sort field (default: createdAt)
  - `direction` (optional): Sort direction (default: desc)
  - `courseName` (optional): Filter by course name
  - `instructorName` (optional): Filter by instructor name
  - `rating` (optional): Filter by rating (1-5)

#### 2. Submit New Feedback
- **Endpoint**: `POST /api/feedback`
- **Description**: Submit feedback for a course or faculty member
- **Request Body**: FeedbackRequest DTO
```json
{
  "courseName": "Data Structures",
  "instructorName": "Dr. Smith",
  "type": "COURSE",
  "rating": 4,
  "comments": "Great course content and delivery",
  "category": "Teaching Quality",
  "studentId": "STU001",
  "anonymous": false
}
```

#### 3. Get Feedback by ID
- **Endpoint**: `GET /api/feedback/{id}`
- **Description**: Retrieve a specific feedback by its ID

#### 4. Update Feedback
- **Endpoint**: `PUT /api/feedback/{id}`
- **Description**: Update an existing feedback
- **Request Body**: FeedbackRequest DTO

#### 5. Delete Feedback
- **Endpoint**: `DELETE /api/feedback/{id}`
- **Description**: Delete a feedback by its ID (Admin only)

#### 6. Get Feedback by Course
- **Endpoint**: `GET /api/feedback/course/{courseId}`
- **Description**: Retrieve all feedback for a specific course

#### 7. Get Feedback by Faculty
- **Endpoint**: `GET /api/feedback/faculty/{facultyId}`
- **Description**: Retrieve all feedback for a specific faculty member

#### 8. Admin Feedback View
- **Endpoint**: `GET /api/feedback/admin`
- **Description**: Get feedbacks with admin privileges and advanced filtering
- **Access**: Admin only

#### 9. Faculty Feedback View
- **Endpoint**: `GET /api/feedback/faculty-view`
- **Description**: Get feedbacks visible to faculty members
- **Access**: Faculty only

## Data Models

### FeedbackRequest DTO
```json
{
  "courseName": "string (required)",
  "instructorName": "string (required)",
  "type": "COURSE | FACULTY | FACILITY (required)",
  "rating": "integer (1-5, required)",
  "comments": "string (max 1000 chars)",
  "category": "string",
  "studentId": "string",
  "anonymous": "boolean (default: false)"
}
```

### FeedbackResponse DTO
```json
{
  "id": "long",
  "courseName": "string",
  "instructorName": "string",
  "type": "COURSE | FACULTY | FACILITY",
  "rating": "integer (1-5)",
  "comments": "string",
  "category": "string",
  "studentId": "string",
  "anonymous": "boolean",
  "sentiment": "string",
  "reviewed": "boolean",
  "adminResponse": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Role-Based Access

### Admin Users
- Can view all feedbacks with advanced filtering and pagination
- Can delete any feedback
- Access to `/api/feedback/admin` endpoint

### Faculty Users
- Can view feedbacks related to their courses
- Cannot delete feedbacks (view-only access)
- Access to `/api/feedback/faculty-view` endpoint

### Students
- Can submit new feedback
- Can view general feedback list
- Cannot delete feedbacks

## Frontend Integration

The frontend components have been updated to support role-based feedback viewing:

1. **AdminDashboard**: Uses `FeedbackTable` with `userRole="ADMIN"` for full management capabilities
2. **RoleBasedDashboard**: Passes user role and faculty name to `FeedbackTable` for appropriate filtering
3. **FeedbackForm**: Updated to match backend DTO structure with category field

## Testing the API

1. Start the backend server
2. Navigate to the Swagger UI URL
3. Use the interactive documentation to test endpoints
4. For role-based endpoints, ensure proper authentication/authorization is in place