const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false, 
  placeholder = "", 
  className = "",
  disabled = false,
  rows = 3,
  options = [], // For select fields
  accept = "", // For file inputs
  helpText = "",
  ...props 
}) => {
  const fieldId = `field-${name}`;
  const hasError = !!error;
  
  const baseInputClass = `form-control ${hasError ? 'is-invalid' : ''} ${className}`;
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={baseInputClass}
            disabled={disabled}
            rows={rows}
            {...props}
          />
        );
        
      case 'select':
        return (
          <select
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClass}
            disabled={disabled}
            {...props}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'file':
        return (
          <input
            id={fieldId}
            name={name}
            type="file"
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClass}
            disabled={disabled}
            accept={accept}
            {...props}
          />
        );
        
      case 'checkbox':
        return (
          <div className="form-check">
            <input
              id={fieldId}
              name={name}
              type="checkbox"
              checked={value}
              onChange={onChange}
              onBlur={onBlur}
              className={`form-check-input ${hasError ? 'is-invalid' : ''}`}
              disabled={disabled}
              {...props}
            />
            <label className="form-check-label" htmlFor={fieldId}>
              {label}
              {required && <span className="text-danger ms-1">*</span>}
            </label>
          </div>
        );
        
      default:
        return (
          <input
            id={fieldId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={baseInputClass}
            disabled={disabled}
            {...props}
          />
        );
    }
  };
  
  if (type === 'checkbox') {
    return (
      <div className="mb-3">
        {renderInput()}
        {error && <div className="invalid-feedback d-block">{error}</div>}
        {helpText && <div className="form-text">{helpText}</div>}
      </div>
    );
  }
  
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={fieldId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <div className="invalid-feedback">{error}</div>}
      {helpText && <div className="form-text">{helpText}</div>}
    </div>
  );
};

export default FormField;
