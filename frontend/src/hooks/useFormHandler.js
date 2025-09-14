import { useState } from 'react';
import { toast } from 'react-toastify';

const useFormHandler = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form field
  const updateField = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Set multiple fields at once
  const setFields = (fields) => {
    setFormData(prev => ({
      ...prev,
      ...fields
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setIsLoading(false);
    setIsSubmitting(false);
  };

  // Set form errors
  const setFormErrors = (newErrors) => {
    if (typeof newErrors === 'object') {
      setErrors(newErrors);
    } else if (typeof newErrors === 'string') {
      toast.error(newErrors);
    }
  };

  // Clear all errors
  const clearErrors = () => {
    setErrors({});
  };

  // Validate field
  const validateField = (name, value, rules = {}) => {
    const fieldErrors = [];

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      fieldErrors.push(`${name} is required`);
    }

    // Email validation
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        fieldErrors.push('Please enter a valid email address');
      }
    }

    // URL validation
    if (rules.url && value) {
      try {
        new URL(value);
      } catch {
        fieldErrors.push('Please enter a valid URL');
      }
    }

    // Min length validation
    if (rules.minLength && value && value.length < rules.minLength) {
      fieldErrors.push(`${name} must be at least ${rules.minLength} characters`);
    }

    // Max length validation
    if (rules.maxLength && value && value.length > rules.maxLength) {
      fieldErrors.push(`${name} must not exceed ${rules.maxLength} characters`);
    }

    // Pattern validation
    if (rules.pattern && value && !rules.pattern.test(value)) {
      fieldErrors.push(rules.patternMessage || `${name} format is invalid`);
    }

    return fieldErrors;
  };

  // Validate entire form
  const validateForm = (validationRules = {}) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const fieldValue = formData[fieldName];
      const fieldRules = validationRules[fieldName];
      const fieldErrors = validateField(fieldName, fieldValue, fieldRules);

      if (fieldErrors.length > 0) {
        newErrors[fieldName] = fieldErrors[0]; // Show first error
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission with error handling
  const handleSubmit = async (submitFunction, validationRules = {}, options = {}) => {
    const { 
      showSuccessToast = true, 
      successMessage = 'Operation completed successfully!',
      onSuccess = null,
      onError = null
    } = options;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form if rules provided
      if (Object.keys(validationRules).length > 0) {
        const isValid = validateForm(validationRules);
        if (!isValid) {
          setIsSubmitting(false);
          return { success: false, errors: errors };
        }
      }

      // Call the submit function
      const result = await submitFunction(formData);

      if (result.error) {
        // Handle API errors
        if (result.errors) {
          setFormErrors(result.errors);
        } else if (result.message) {
          toast.error(result.message);
        }
        
        if (onError) {
          onError(result);
        }
        
        return { success: false, ...result };
      } else {
        // Success
        if (showSuccessToast && (result.message || successMessage)) {
          toast.success(result.message || successMessage);
        }
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return { success: true, ...result };
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      
      if (onError) {
        onError({ error: true, message: error.message });
      }
      
      return { success: false, error: true, message: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get field error
  const getFieldError = (fieldName) => {
    return errors[fieldName] || null;
  };

  // Check if field has error
  const hasFieldError = (fieldName) => {
    return !!errors[fieldName];
  };

  // Get field props for input components
  const getFieldProps = (fieldName, validationRules = {}) => {
    return {
      value: formData[fieldName] || '',
      onChange: (e) => updateField(fieldName, e.target.value),
      onBlur: () => {
        if (Object.keys(validationRules).length > 0) {
          const fieldErrors = validateField(fieldName, formData[fieldName], validationRules);
          if (fieldErrors.length > 0) {
            setErrors(prev => ({
              ...prev,
              [fieldName]: fieldErrors[0]
            }));
          }
        }
      },
      className: hasFieldError(fieldName) ? 'form-control is-invalid' : 'form-control'
    };
  };

  return {
    formData,
    errors,
    isLoading,
    isSubmitting,
    updateField,
    setFields,
    resetForm,
    setFormErrors,
    clearErrors,
    validateField,
    validateForm,
    handleSubmit,
    getFieldError,
    hasFieldError,
    getFieldProps,
    setIsLoading
  };
};

export default useFormHandler;
