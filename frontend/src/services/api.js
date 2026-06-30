import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60s timeout for LLM parsing
});

/**
 * Sends candidate documents and github details to backend for integration.
 * @param {File} resume - Resume PDF file
 * @param {File} recruiterCsv - Recruiter CSV file
 * @param {string} githubUsername - GitHub username string
 * @param {Object} outputConfig - Optional output configuration JSON
 * @returns {Promise<Object>} The integrated candidate profile JSON
 */
export const transformCandidateData = async (resume, recruiterCsv, githubUsername, outputConfig) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('recruiter_csv', recruiterCsv);
  formData.append('github_username', githubUsername);

  // Send the output config as a JSON string
  if (outputConfig) {
    formData.append('output_config', JSON.stringify(outputConfig));
  }

  try {
    const response = await apiClient.post('/transform', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. The LLM parsing took longer than 60 seconds.');
    }
    if (error.response) {
      // Server responded with status code outside of 2xx
      const detail = error.response.data?.detail || error.response.data?.message;
      throw new Error(detail || `Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request made but no response received (backend offline)
      throw new Error('Backend server is unreachable. Please check if the FastAPI server is running.');
    } else {
      throw new Error(error.message);
    }
  }
};
