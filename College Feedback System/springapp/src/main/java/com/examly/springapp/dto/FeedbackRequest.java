package com.examly.springapp.dto;

import com.examly.springapp.model.FeedbackType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

@Schema(description = "Request object for submitting feedback")
public class FeedbackRequest {
    
    @Schema(description = "Course or subject name", example = "Data Structures", required = true)
    @NotBlank(message = "Course name is required")
    private String courseName;
    
    @Schema(description = "Instructor or faculty name", example = "Dr. Smith", required = true)
    @NotBlank(message = "Instructor name is required")
    private String instructorName;
    
    @Schema(description = "Type of feedback", example = "COURSE", required = true)
    @NotNull(message = "Feedback type is required")
    private FeedbackType type;
    
    @Schema(description = "Rating from 1 to 5", example = "4", required = true)
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;
    
    @Schema(description = "Detailed comments", example = "Great course content and delivery")
    @Size(max = 1000, message = "Comments must not exceed 1000 characters")
    private String comments;
    
    @Schema(description = "Feedback category", example = "Teaching Quality")
    private String category;
    
    @Schema(description = "Student ID", example = "STU001")
    private String studentId;
    
    @Schema(description = "Whether feedback is anonymous", example = "false")
    private boolean anonymous = false;

    // Constructors
    public FeedbackRequest() {}

    // Getters and Setters
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }

    public FeedbackType getType() { return type; }
    public void setType(FeedbackType type) { this.type = type; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public boolean isAnonymous() { return anonymous; }
    public void setAnonymous(boolean anonymous) { this.anonymous = anonymous; }
}