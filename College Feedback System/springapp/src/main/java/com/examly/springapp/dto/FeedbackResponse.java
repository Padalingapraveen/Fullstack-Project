package com.examly.springapp.dto;

import com.examly.springapp.model.FeedbackType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "Response object for feedback data")
public class FeedbackResponse {
    
    @Schema(description = "Feedback ID", example = "1")
    private Long id;
    
    @Schema(description = "Course name", example = "Data Structures")
    private String courseName;
    
    @Schema(description = "Instructor name", example = "Dr. Smith")
    private String instructorName;
    
    @Schema(description = "Feedback type", example = "COURSE")
    private FeedbackType type;
    
    @Schema(description = "Rating from 1 to 5", example = "4")
    private int rating;
    
    @Schema(description = "Feedback comments", example = "Great course content")
    private String comments;
    
    @Schema(description = "Feedback category", example = "Teaching Quality")
    private String category;
    
    @Schema(description = "Student ID", example = "STU001")
    private String studentId;
    
    @Schema(description = "Whether feedback is anonymous", example = "false")
    private boolean anonymous;
    
    @Schema(description = "Sentiment analysis result", example = "POSITIVE")
    private String sentiment;
    
    @Schema(description = "Whether feedback has been reviewed", example = "false")
    private boolean reviewed;
    
    @Schema(description = "Admin response to feedback", example = "Thank you for your feedback")
    private String adminResponse;
    
    @Schema(description = "Creation timestamp", example = "2024-01-15T10:30:00")
    private LocalDateTime createdAt;
    
    @Schema(description = "Last update timestamp", example = "2024-01-15T10:30:00")
    private LocalDateTime updatedAt;

    // Constructors
    public FeedbackResponse() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public String getSentiment() { return sentiment; }
    public void setSentiment(String sentiment) { this.sentiment = sentiment; }

    public boolean isReviewed() { return reviewed; }
    public void setReviewed(boolean reviewed) { this.reviewed = reviewed; }

    public String getAdminResponse() { return adminResponse; }
    public void setAdminResponse(String adminResponse) { this.adminResponse = adminResponse; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}