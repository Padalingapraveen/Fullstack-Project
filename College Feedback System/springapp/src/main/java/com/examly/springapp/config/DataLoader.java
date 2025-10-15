package com.examly.springapp.config;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private CampaignRepository campaignRepository;
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User testUser = new User();
            testUser.setUsername("admin");
            testUser.setPassword(passwordEncoder.encode("admin123"));
            testUser.setEmail("admin@test.com");
            testUser.setFullName("Test Admin");
            testUser.setRole(Role.ADMIN);
            testUser.setEnabled(true);
            userRepository.save(testUser);

            User studentUser = new User();
            studentUser.setUsername("student");
            studentUser.setPassword(passwordEncoder.encode("student123"));
            studentUser.setEmail("student@test.com");
            studentUser.setFullName("Test Student");
            studentUser.setRole(Role.STUDENT);
            studentUser.setEnabled(true);
            userRepository.save(studentUser);
            
            User facultyUser = new User();
            facultyUser.setUsername("faculty");
            facultyUser.setPassword(passwordEncoder.encode("faculty123"));
            facultyUser.setEmail("faculty@test.com");
            facultyUser.setFullName("Test Faculty");
            facultyUser.setRole(Role.FACULTY);
            facultyUser.setEnabled(true);
            userRepository.save(facultyUser);
            
            User student2 = new User();
            student2.setUsername("john_doe");
            student2.setPassword(passwordEncoder.encode("password123"));
            student2.setEmail("john@test.com");
            student2.setFullName("John Doe");
            student2.setRole(Role.STUDENT);
            student2.setEnabled(true);
            userRepository.save(student2);
        }
        
        if (courseRepository.count() == 0) {
            Course course1 = new Course();
            course1.setName("Computer Science 101");
            course1.setCode("CS101");
            courseRepository.save(course1);
            
            Course course2 = new Course();
            course2.setName("Mathematics 201");
            course2.setCode("MATH201");
            courseRepository.save(course2);
        }
        
        if (campaignRepository.count() == 0) {
            Campaign campaign1 = new Campaign();
            campaign1.setName("Fall 2024 Feedback");
            campaign1.setDescription("Semester feedback collection");
            campaign1.setActive(true);
            campaignRepository.save(campaign1);
        }
        
        if (feedbackRepository.count() < 10) {
            feedbackRepository.deleteAll();
            Feedback feedback1 = new Feedback();
            feedback1.setCourseName("Computer Science 101");
            feedback1.setInstructorName("Dr. Smith");
            feedback1.setRating(5);
            feedback1.setComments("Excellent course! Very informative and well-structured.");
            feedback1.setType(FeedbackType.COURSE);
            feedback1.setAnonymous(false);
            feedbackRepository.save(feedback1);
            
            Feedback feedback2 = new Feedback();
            feedback2.setCourseName("Mathematics 201");
            feedback2.setInstructorName("Prof. Johnson");
            feedback2.setRating(4);
            feedback2.setComments("Good course but could use more practical examples.");
            feedback2.setType(FeedbackType.FACULTY);
            feedback2.setAnonymous(true);
            feedbackRepository.save(feedback2);
            
            Feedback feedback3 = new Feedback();
            feedback3.setCourseName("Physics 101");
            feedback3.setInstructorName("Dr. Brown");
            feedback3.setRating(3);
            feedback3.setComments("Average course, needs improvement in lab sessions.");
            feedback3.setType(FeedbackType.GENERAL);
            feedback3.setAnonymous(false);
            feedbackRepository.save(feedback3);
            
            // Additional sample feedback
            Feedback feedback4 = new Feedback();
            feedback4.setCourseName("Chemistry 101");
            feedback4.setInstructorName("Dr. Wilson");
            feedback4.setRating(5);
            feedback4.setComments("Outstanding teaching methods and clear explanations.");
            feedback4.setType(FeedbackType.COURSE);
            feedback4.setAnonymous(false);
            feedbackRepository.save(feedback4);
            
            Feedback feedback5 = new Feedback();
            feedback5.setCourseName("Biology 201");
            feedback5.setInstructorName("Prof. Davis");
            feedback5.setRating(4);
            feedback5.setComments("Great content but assignments are too lengthy.");
            feedback5.setType(FeedbackType.FACULTY);
            feedback5.setAnonymous(true);
            feedbackRepository.save(feedback5);
            
            Feedback feedback6 = new Feedback();
            feedback6.setCourseName("English 101");
            feedback6.setInstructorName("Ms. Taylor");
            feedback6.setRating(4);
            feedback6.setComments("Engaging lectures and helpful feedback on essays.");
            feedback6.setType(FeedbackType.COURSE);
            feedback6.setAnonymous(false);
            feedbackRepository.save(feedback6);
            
            Feedback feedback7 = new Feedback();
            feedback7.setCourseName("History 201");
            feedback7.setInstructorName("Dr. Anderson");
            feedback7.setRating(3);
            feedback7.setComments("Interesting topics but lectures can be monotonous.");
            feedback7.setType(FeedbackType.GENERAL);
            feedback7.setAnonymous(true);
            feedbackRepository.save(feedback7);
            
            Feedback feedback8 = new Feedback();
            feedback8.setCourseName("Computer Science 201");
            feedback8.setInstructorName("Prof. Lee");
            feedback8.setRating(5);
            feedback8.setComments("Excellent programming exercises and project work.");
            feedback8.setType(FeedbackType.COURSE);
            feedback8.setAnonymous(false);
            feedbackRepository.save(feedback8);
            
            Feedback feedback9 = new Feedback();
            feedback9.setCourseName("Statistics 101");
            feedback9.setInstructorName("Dr. Garcia");
            feedback9.setRating(2);
            feedback9.setComments("Difficult to follow, needs better examples.");
            feedback9.setType(FeedbackType.FACULTY);
            feedback9.setAnonymous(true);
            feedbackRepository.save(feedback9);
            
            Feedback feedback10 = new Feedback();
            feedback10.setCourseName("Art 101");
            feedback10.setInstructorName("Ms. Rodriguez");
            feedback10.setRating(5);
            feedback10.setComments("Creative and inspiring classes with hands-on activities.");
            feedback10.setType(FeedbackType.COURSE);
            feedback10.setAnonymous(false);
            feedbackRepository.save(feedback10);
            
            Feedback feedback11 = new Feedback();
            feedback11.setCourseName("Psychology 201");
            feedback11.setInstructorName("Dr. Martinez");
            feedback11.setRating(4);
            feedback11.setComments("Thought-provoking discussions and case studies.");
            feedback11.setType(FeedbackType.GENERAL);
            feedback11.setAnonymous(false);
            feedbackRepository.save(feedback11);
            
            Feedback feedback12 = new Feedback();
            feedback12.setCourseName("Economics 101");
            feedback12.setInstructorName("Prof. Thompson");
            feedback12.setRating(3);
            feedback12.setComments("Good theoretical knowledge but lacks practical applications.");
            feedback12.setType(FeedbackType.COURSE);
            feedback12.setAnonymous(true);
            feedbackRepository.save(feedback12);
            
            Feedback feedback13 = new Feedback();
            feedback13.setCourseName("Philosophy 101");
            feedback13.setInstructorName("Dr. White");
            feedback13.setRating(4);
            feedback13.setComments("Challenging concepts explained in an accessible way.");
            feedback13.setType(FeedbackType.FACULTY);
            feedback13.setAnonymous(false);
            feedbackRepository.save(feedback13);
        }
    }
}