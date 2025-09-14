/* eslint react/prop-types: 0 */
const LoadingSpinner = ({ size = "md", text = "Loading...", fullScreen = false }) => {
    const sizeMap = {
      sm: 24,
      md: 40,
      lg: 64,
    };

    const spinnerStyle = {
      width: `${sizeMap[size] ?? sizeMap.md}px`,
      height: `${sizeMap[size] ?? sizeMap.md}px`,
      lineHeight: 0,
    };

    const spinnerContent = (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-live="polite"
          aria-busy="true"
          style={spinnerStyle}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        {text && <div className="mt-2 text-muted small">{text}</div>}
      </div>
    );

  if (fullScreen) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: 9999,
          padding: '1rem',
        }}
      >
        <div style={{ maxWidth: 'min(90vw, 420px)' }}>{spinnerContent}</div>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
