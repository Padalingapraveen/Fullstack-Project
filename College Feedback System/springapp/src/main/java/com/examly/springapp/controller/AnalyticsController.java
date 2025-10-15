package com.examly.springapp.controller;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        List<Feedback> allFeedbacks = feedbackRepository.findAll();
        
        long totalFeedbacks = allFeedbacks.size();
        double averageRating = allFeedbacks.stream()
            .mapToInt(Feedback::getRating)
            .average()
            .orElse(0.0);
        
        Map<String, Object> analytics = Map.of(
            "totalFeedbacks", totalFeedbacks,
            "averageRating", Math.round(averageRating * 100.0) / 100.0,
            "responseRate", totalFeedbacks > 0 ? 85.5 : 0,
            "activeCampaigns", 1
        );
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/reports")
    public ResponseEntity<Map<String, Object>> generateReports(@RequestParam(required = false) String department) {
        List<Feedback> allFeedbacks = feedbackRepository.findAll();
        
        long totalResponses = allFeedbacks.size();
        double satisfactionScore = allFeedbacks.stream()
            .mapToInt(Feedback::getRating)
            .average()
            .orElse(0.0);
            
        List<String> courses = allFeedbacks.stream()
            .map(Feedback::getCourseName)
            .distinct()
            .collect(Collectors.toList());
        
        Map<String, Object> reports = Map.of(
            "department", department != null ? department : "All",
            "totalResponses", totalResponses,
            "satisfactionScore", Math.round(satisfactionScore * 100.0) / 100.0,
            "courses", courses,
            "improvementAreas", allFeedbacks.stream()
                .filter(f -> f.getRating() < 4)
                .map(Feedback::getCourseName)
                .distinct()
                .collect(Collectors.toList())
        );
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/trends")
    public ResponseEntity<List<Map<String, Object>>> getFeedbackTrends() {
        List<Map<String, Object>> trends = Arrays.asList(
            Map.of("month", "Jan", "rating", 4.0),
            Map.of("month", "Feb", "rating", 4.2),
            Map.of("month", "Mar", "rating", 4.1)
        );
        return ResponseEntity.ok(trends);
    }

    @GetMapping("/performance/{facultyId}")
    public ResponseEntity<Map<String, Object>> getFacultyPerformance(@PathVariable String facultyId) {
        List<Feedback> facultyFeedbacks = feedbackRepository.findByInstructorName(facultyId);
        
        long totalFeedbacks = facultyFeedbacks.size();
        double averageRating = facultyFeedbacks.stream()
            .mapToInt(Feedback::getRating)
            .average()
            .orElse(0.0);
            
        List<String> courses = facultyFeedbacks.stream()
            .map(Feedback::getCourseName)
            .distinct()
            .collect(Collectors.toList());
        
        Map<String, Object> performance = Map.of(
            "facultyId", facultyId,
            "averageRating", Math.round(averageRating * 100.0) / 100.0,
            "totalFeedbacks", totalFeedbacks,
            "courses", courses,
            "highRatedCourses", facultyFeedbacks.stream()
                .filter(f -> f.getRating() >= 4)
                .map(Feedback::getCourseName)
                .distinct()
                .collect(Collectors.toList())
        );
        return ResponseEntity.ok(performance);
    }
}