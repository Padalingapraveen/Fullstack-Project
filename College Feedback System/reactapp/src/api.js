import axios from "axios";

const api = axios.create({
  baseURL: "https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io/api",
});



export default api;

// Feedback APIs
export const fetchFeedbacks = (page, size, sort, filter) =>
  api.get("/feedback", { params: { page, size, sort, filter } });

export const submitFeedback = (feedback) => api.post("/feedback", feedback);
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);
export const getFeedbackByCourse = (courseId) => api.get(`/feedback/course/${courseId}`);
export const getFeedbackByFaculty = (facultyId) => api.get(`/feedback/faculty/${facultyId}`);

// Course APIs
export const getCourses = () => api.get("/courses");
export const addCourse = (course) => api.post("/courses", course);
export const searchCourses = (query) => api.get(`/courses/search?query=${query}`);

// Campaign APIs
export const getCampaigns = () => api.get("/campaigns");
export const createCampaign = (campaign) => api.post("/campaigns", campaign);
export const updateCampaignStatus = (id, active) => api.put(`/campaigns/${id}/status?active=${active}`);

// Analytics APIs
export const getDashboardAnalytics = () => api.get("/analytics/dashboard");
export const generateReports = (department) => api.get(`/analytics/reports${department ? `?department=${department}` : ''}`);
export const getFeedbackTrends = () => api.get("/analytics/trends");
export const getFacultyPerformance = (facultyId) => api.get(`/analytics/performance/${facultyId}`);