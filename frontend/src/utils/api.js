import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8000/api/';

// Get token from localStorage
const getToken = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const data = JSON.parse(userInfo);
      return data.token;
    }
  } catch (error) {
    console.error('Error parsing user info:', error);
  }
  return null;
};

// Create headers with authentication
const createHeaders = (includeAuth = true, isFormData = false) => {
  const headers = {};
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  headers['Accept'] = 'application/json';
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Handle API errors
const handleApiError = (error, showToast = true) => {
  console.error('API Error:', error);
  
  let errorMessage = 'An unexpected error occurred';
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    errorMessage = 'Network error. Please check your connection.';
  } else if (error.status === 401) {
    errorMessage = 'Unauthorized. Please login again.';
    // Redirect to login
    localStorage.removeItem('userInfo');
    window.location.href = '/admin/login';
  } else if (error.status === 403) {
    errorMessage = 'Access forbidden. You don\'t have permission.';
  } else if (error.status === 404) {
    errorMessage = 'Resource not found.';
  } else if (error.status === 422) {
    errorMessage = 'Validation error. Please check your input.';
  } else if (error.status >= 500) {
    errorMessage = 'Server error. Please try again later.';
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  if (showToast) {
    toast.error(errorMessage);
  }
  
  return { error: true, message: errorMessage, status: error.status };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    includeAuth = true,
    isFormData = false,
    showErrorToast = true
  } = options;
  
  try {
    const config = {
      method,
      headers: createHeaders(includeAuth, isFormData),
    };
    
    if (body) {
      config.body = isFormData ? body : JSON.stringify(body);
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    
    const data = await response.json();
    
    // Handle API-level errors (status: false)
    if (data.status === false) {
      if (data.errors) {
        // Handle validation errors
        const errorMessages = [];
        Object.keys(data.errors).forEach(key => {
          if (Array.isArray(data.errors[key])) {
            errorMessages.push(...data.errors[key]);
          } else {
            errorMessages.push(data.errors[key]);
          }
        });
        
        if (showErrorToast) {
          errorMessages.forEach(msg => toast.error(msg));
        }
        
        return { 
          error: true, 
          message: data.message || 'Validation failed', 
          errors: data.errors,
          validationErrors: errorMessages
        };
      } else {
        if (showErrorToast && data.message) {
          toast.error(data.message);
        }
        return { error: true, message: data.message || 'Request failed' };
      }
    }
    
    return { error: false, data: data.data || data, message: data.message };
    
  } catch (error) {
    return handleApiError(error, showErrorToast);
  }
};

// Specific API methods
export const api = {
  // GET request
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
  
  // POST request
  post: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'POST', body }),
  
  // PUT request
  put: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'PUT', body }),
  
  // DELETE request
  delete: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
  
  // File upload
  upload: (endpoint, formData, options = {}) => 
    apiRequest(endpoint, { 
      ...options, 
      method: 'POST', 
      body: formData, 
      isFormData: true 
    }),
};

// Authentication helpers
export const auth = {
  login: async (credentials) => {
    const result = await api.post('authenticate', credentials, { includeAuth: false });
    
    if (!result.error && result.data) {
      const userInfo = {
        id: result.data.id,
        token: result.data.token,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      toast.success('Login successful!');
    }
    
    return result;
  },
  
  logout: async () => {
    const result = await api.get('logout');
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully!');
    return result;
  },
  
  isAuthenticated: () => {
    return !!getToken();
  }
};

// Export utilities
export { getToken, API_BASE_URL };
export default api;
