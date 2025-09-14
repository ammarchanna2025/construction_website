import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-danger">
                <div className="card-header bg-danger text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Something went wrong
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
                  </p>
                  
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-3">
                      <h6>Error Details (Development Mode):</h6>
                      <div className="alert alert-secondary">
                        <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                        <br />
                        <strong>Component Stack:</strong>
                        <pre className="mt-2 small">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3">
                    <button 
                      className="btn btn-primary me-2"
                      onClick={() => window.location.reload()}
                    >
                      Refresh Page
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => window.history.back()}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
