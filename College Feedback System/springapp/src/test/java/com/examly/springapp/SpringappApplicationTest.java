package com.examly.springapp;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SpringappApplicationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void cleanDatabase() {
        // Ensure a fresh start for each test
        feedbackRepository.deleteAll();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetFeedbackInitiallyEmpty() throws Exception {
        mockMvc.perform(get("/api/feedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddFeedbackValidData() throws Exception {
        Feedback fb = new Feedback("Math", "John Doe", 5, "Great course", "123");
        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.courseName", is("Math")))
                .andExpect(jsonPath("$.instructorName", is("John Doe")))
                .andExpect(jsonPath("$.rating", is(5)))
                .andExpect(jsonPath("$.comments", is("Great course")))
                .andExpect(jsonPath("$.studentId", is("123")));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetAfterAddingOneFeedback() throws Exception {
        Feedback fb = new Feedback("Science", "Jane Smith", 4, "Good course", "456");
        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/feedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].courseName", is("Science")));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddMultipleFeedbacksAndVerifyCount() throws Exception {
        Feedback fb1 = new Feedback("English", "Mr. Brown", 3, "Average", "789");
        Feedback fb2 = new Feedback("History", "Mrs. White", 5, "Excellent", "101");

        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb1)))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb2)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/feedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddFeedbackWithoutStudentId() throws Exception {
        Feedback fb = new Feedback("Art", "Ms. Green", 5, "Loved it", null);
        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentId").doesNotExist());
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddFeedbackWithMinRating() throws Exception {
        Feedback fb = new Feedback("Music", "Mr. Blue", 1, "Not great", "202");
        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rating", is(1)));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddFeedbackWithMaxRating() throws Exception {
        Feedback fb = new Feedback("Physics", "Dr. Red", 5, "Perfect", "303");
        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rating", is(5)));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetFeedbackContainsCorrectFields() throws Exception {
        Feedback fb = new Feedback("Chemistry", "Prof. Yellow", 4, "Interesting", "404");
        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/feedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].courseName").exists())
                .andExpect(jsonPath("$[0].instructorName").exists())
                .andExpect(jsonPath("$[0].rating").exists())
                .andExpect(jsonPath("$[0].comments").exists());
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testMultiplePostsThenVerifyOrder() throws Exception {
        Feedback fb1 = new Feedback("Geography", "Mr. Gray", 4, "Good content", "606");
        Feedback fb2 = new Feedback("Economics", "Mrs. Pink", 5, "Excellent", "707");

        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb1)))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fb2)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/feedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].courseName", is("Geography")))
                .andExpect(jsonPath("$[1].courseName", is("Economics")));
    }
}
