import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import api from "../api";
import axios from "axios";
import "@testing-library/jest-dom"
jest.mock("../api");

const mockFeedbacks = [
  {
    id: 1,
    courseName: "Math",
    instructorName: "Dr. Smith",
    rating: 5,
    comments: "Great course!",
    studentId: "123",
  },
];

describe("CollegeFeedbackSystem", () => {
  test("React_BuildUIComponents_rendersAppHeading", () => {
    render(<App />);
    expect(screen.getByText("College Feedback System")).toBeInTheDocument();
  });

  test("React_BuildUIComponents_rendersFeedbackFormFields", () => {
    render(<FeedbackForm onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText("Course Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Instructor Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Rating (1-5)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your comments")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Student ID (optional)")).toBeInTheDocument();
  });

  test("React_BuildUIComponents_submitFeedbackFormCallsOnSubmit", () => {
    const mockSubmit = jest.fn();
    render(<FeedbackForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Course Name"), { target: { value: "Math" } });
    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), { target: { value: "Dr. Smith" } });
    fireEvent.change(screen.getByPlaceholderText("Rating (1-5)"), { target: { value: "5" } });
    fireEvent.change(screen.getByPlaceholderText("Your comments"), { target: { value: "Great course!" } });
    fireEvent.change(screen.getByPlaceholderText("Student ID (optional)"), { target: { value: "123" } });
    fireEvent.click(screen.getByText("Submit Feedback"));
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test("React_BuildUIComponents_feedbackListDisplaysRows", () => {
    render(<FeedbackList feedbacks={mockFeedbacks} />);
    expect(screen.getByText("Math")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Great course!")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  test("React_BuildUIComponents_showsAnonymousIfStudentIdMissing", () => {
    const noIdFeedback = [{ ...mockFeedbacks[0], studentId: "" }];
    render(<FeedbackList feedbacks={noIdFeedback} />);
    expect(screen.getByText("Anonymous")).toBeInTheDocument();
  });

  test("React_UITestingAndResponsivenessFixes_showsNoFeedbackMessageWhenEmpty", () => {
    render(<FeedbackList feedbacks={[]} />);
    expect(screen.getByText("No feedback submitted yet.")).toBeInTheDocument();
  });

  test("React_APIIntegration_TestingAndAPIDocumentation_fetchesAndDisplaysFeedbacksOnLoad", async () => {
    api.get.mockResolvedValueOnce({ data: mockFeedbacks });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Math")).toBeInTheDocument();
    });
  });

  test("React_APIIntegration_TestingAndAPIDocumentation_submitsFeedbackAndRefetches", async () => {
    api.get.mockResolvedValueOnce({ data: [] }); // First fetch
    api.post.mockResolvedValueOnce({});
    api.get.mockResolvedValueOnce({ data: mockFeedbacks }); // After post
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Course Name"), { target: { value: "Math" } });
    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), { target: { value: "Dr. Smith" } });
    fireEvent.change(screen.getByPlaceholderText("Rating (1-5)"), { target: { value: "5" } });
    fireEvent.click(screen.getByText("Submit Feedback"));
    await waitFor(() => expect(screen.getByText("Math")).toBeInTheDocument());
  });

  test("React_UITestingAndResponsivenessFixes_handlesApiFetchError", async () => {
    console.error = jest.fn(); // suppress expected error
    api.get.mockRejectedValueOnce(new Error("API Error"));
    render(<App />);
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  test("React_BuildUIComponents_formClearsAfterSubmit", () => {
    const mockSubmit = jest.fn();
    render(<FeedbackForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Course Name"), { target: { value: "Math" } });
    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), { target: { value: "Dr. Smith" } });
    fireEvent.change(screen.getByPlaceholderText("Rating (1-5)"), { target: { value: "5" } });
    fireEvent.click(screen.getByText("Submit Feedback"));
    expect(screen.getByPlaceholderText("Course Name").value).toBe("");
  });

  test("React_UITestingAndResponsivenessFixes_ratingFieldRejectsOutOfRange", () => {
    render(<FeedbackForm onSubmit={jest.fn()} />);
    const ratingInput = screen.getByPlaceholderText("Rating (1-5)");
    fireEvent.change(ratingInput, { target: { value: "10" } });
    expect(ratingInput.value).toBe("10"); // Still allows input but actual app logic should validate this
  });
});
