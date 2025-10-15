package com.examly.springapp.controller;

import com.examly.springapp.dto.FeedbackRequest;
import com.examly.springapp.dto.FeedbackResponse;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.criteria.Predicate;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
@Tag(name = "Feedback Management", description = "APIs for managing student feedback on courses and faculty")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping
    @Operation(summary = "Get all feedbacks", description = "Retrieve feedbacks with optional filtering and pagination")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved feedbacks",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Page.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<?> getFeedbacks(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "createdAt") String sort,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String direction,
            @Parameter(description = "Filter by course name") @RequestParam(required = false) String courseName,
            @Parameter(description = "Filter by instructor name") @RequestParam(required = false) String instructorName,
            @Parameter(description = "Filter by rating (1-5)") @RequestParam(required = false) Integer rating,
            @Parameter(description = "Admin view with pagination") @RequestParam(defaultValue = "false") boolean admin) {
        
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return ResponseEntity.ok(feedbacks);
    }

    @PostMapping
    @Operation(summary = "Submit new feedback", description = "Submit feedback for a course or faculty member")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback submitted successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Feedback> submitFeedback(
            @Parameter(description = "Feedback data") @Valid @RequestBody FeedbackRequest feedbackRequest) {
        Feedback feedback = new Feedback();
        feedback.setCourseName(feedbackRequest.getCourseName());
        feedback.setInstructorName(feedbackRequest.getInstructorName());
        feedback.setType(feedbackRequest.getType());
        feedback.setRating(feedbackRequest.getRating());
        feedback.setComments(feedbackRequest.getComments());
        feedback.setCategory(feedbackRequest.getCategory());
        feedback.setStudentId(feedbackRequest.getStudentId());
        feedback.setAnonymous(feedbackRequest.isAnonymous());
        feedback.setCreatedAt(LocalDateTime.now());
        
        Feedback saved = feedbackRepository.save(feedback);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get feedback by ID", description = "Retrieve a specific feedback by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "404", description = "Feedback not found")
    })
    public ResponseEntity<Feedback> getFeedbackById(
            @Parameter(description = "Feedback ID") @PathVariable Long id) {
        return feedbackRepository.findById(id)
                .map(feedback -> ResponseEntity.ok(feedback))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update feedback", description = "Update an existing feedback")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "404", description = "Feedback not found"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<Feedback> updateFeedback(
            @Parameter(description = "Feedback ID") @PathVariable Long id, 
            @Parameter(description = "Updated feedback data") @Valid @RequestBody FeedbackRequest feedbackDetails) {
        return feedbackRepository.findById(id)
                .map(feedback -> {
                    feedback.setCourseName(feedbackDetails.getCourseName());
                    feedback.setInstructorName(feedbackDetails.getInstructorName());
                    feedback.setRating(feedbackDetails.getRating());
                    feedback.setComments(feedbackDetails.getComments());
                    feedback.setType(feedbackDetails.getType());
                    feedback.setCategory(feedbackDetails.getCategory());
                    feedback.setStudentId(feedbackDetails.getStudentId());
                    feedback.setAnonymous(feedbackDetails.isAnonymous());
                    feedback.setUpdatedAt(LocalDateTime.now());
                    return ResponseEntity.ok(feedbackRepository.save(feedback));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete feedback", description = "Delete a feedback by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Feedback not found")
    })
    public ResponseEntity<?> deleteFeedback(
            @Parameter(description = "Feedback ID") @PathVariable Long id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Get feedback by course", description = "Retrieve all feedback for a specific course")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback retrieved successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "404", description = "Course not found")
    })
    public ResponseEntity<List<Feedback>> getFeedbackByCourse(
            @Parameter(description = "Course ID") @PathVariable Long courseId) {
        List<Feedback> feedbacks = feedbackRepository.findByCourseId(courseId);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/faculty/{facultyId}")
    @Operation(summary = "Get feedback by faculty", description = "Retrieve all feedback for a specific faculty member")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback retrieved successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "404", description = "Faculty not found")
    })
    public ResponseEntity<List<Feedback>> getFeedbackByFaculty(
            @Parameter(description = "Faculty ID or name") @PathVariable String facultyId) {
        List<Feedback> feedbacks = feedbackRepository.findByInstructorName(facultyId);
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/admin")
    @Operation(summary = "Get feedbacks for admin", description = "Retrieve all feedbacks with admin privileges and filtering")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved admin feedbacks",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Page.class))),
        @ApiResponse(responseCode = "403", description = "Access denied - Admin only")
    })
    public ResponseEntity<?> getAdminFeedbacks(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "createdAt") String sort,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String direction,
            @Parameter(description = "Filter by course") @RequestParam(required = false) String courseName,
            @Parameter(description = "Filter by instructor") @RequestParam(required = false) String instructorName,
            @Parameter(description = "Filter by rating") @RequestParam(required = false) Integer rating) {
        
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(direction) ? Sort.Direction.ASC : Sort.Direction.DESC;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortDirection, sort));
        
        Specification<Feedback> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (courseName != null && !courseName.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("courseName")), 
                    "%" + courseName.trim().toLowerCase() + "%"));
            }
            
            if (instructorName != null && !instructorName.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("instructorName")), 
                    "%" + instructorName.trim().toLowerCase() + "%"));
            }
            
            if (rating != null && rating > 0) {
                predicates.add(criteriaBuilder.equal(root.get("rating"), rating));
            }
            
            return predicates.isEmpty() ? 
                criteriaBuilder.conjunction() : 
                criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        
        Page<Feedback> feedbacks = feedbackRepository.findAll(spec, pageRequest);
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/faculty-view")
    @Operation(summary = "Get feedbacks for faculty view", description = "Retrieve feedbacks visible to faculty members")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved faculty feedbacks",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "403", description = "Access denied - Faculty only")
    })
    public ResponseEntity<List<Feedback>> getFacultyFeedbacks(
            @Parameter(description = "Faculty name filter") @RequestParam(required = false) String facultyName) {
        
        List<Feedback> feedbacks;
        if (facultyName != null && !facultyName.trim().isEmpty()) {
            feedbacks = feedbackRepository.findByInstructorName(facultyName);
        } else {
            feedbacks = feedbackRepository.findAll();
        }
        return ResponseEntity.ok(feedbacks);
    }
}