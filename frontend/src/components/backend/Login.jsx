import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/Auth";
import "../../assets/css/admin.scss";


const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/authenticate", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === false) {
        toast.error(result.message);
      } else {
        const userInfo = {
          id: result.id,
          token: result.token,
        };

        // Store in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Update context
        login(userInfo);

        // Navigate to dashboard
        navigate('/admin/dashboard');
        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      {/* Background with overlay */}
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>

      {/* Main login container */}
      <div className="login-container">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8">

              {/* Login Card */}
              <div className="login-card">
                <div className="card border-0 shadow-lg">
                  <div className="card-body p-0">

                    {/* Header Section */}
                    <div className="login-header text-center p-4">
                      <div className="login-logo mb-3">
                        <div className="logo-icon">
                          <i className="bi bi-building-gear"></i>
                        </div>
                        <h3 className="logo-text mb-0">ARC Construction</h3>
                        <p className="logo-subtitle">Admin Portal</p>
                      </div>
                      <h4 className="login-title">Welcome Back</h4>
                      <p className="login-subtitle text-muted">
                        Sign in to access your dashboard
                      </p>
                    </div>

                    {/* Form Section */}
                    <div className="login-form-section p-4 pt-0">
                      <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email Field */}
                        <div className="form-group mb-3">
                          <label htmlFor="email" className="form-label">
                            <i className="bi bi-envelope me-2"></i>
                            Email Address
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-person"></i>
                            </span>
                            <input
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Please enter a valid email address"
                                }
                              })}
                              type="email"
                              id="email"
                              placeholder="Enter your email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                          </div>
                          {errors.email && (
                            <div className="invalid-feedback d-block">
                              <i className="bi bi-exclamation-circle me-1"></i>
                              {errors.email?.message}
                            </div>
                          )}
                        </div>

                        {/* Password Field */}
                        <div className="form-group mb-4">
                          <label htmlFor="password" className="form-label">
                            <i className="bi bi-lock me-2"></i>
                            Password
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-shield-lock"></i>
                            </span>
                            <input
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message: "Password must be at least 6 characters"
                                }
                              })}
                              type={showPassword ? "text" : "password"}
                              id="password"
                              placeholder="Enter your password"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                          </div>
                          {errors.password && (
                            <div className="invalid-feedback d-block">
                              <i className="bi bi-exclamation-circle me-1"></i>
                              {errors.password?.message}
                            </div>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn btn-primary btn-lg w-100 login-btn"
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Signing In...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-box-arrow-in-right me-2"></i>
                              Sign In
                            </>
                          )}
                        </button>

                      </form>
                    </div>

                    {/* Footer Section */}
                    <div className="login-footer text-center p-3 border-top">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        Secure Admin Access
                      </small>
                    </div>

                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center mt-4">
                <p className="text-white-50 small">
                  <i className="bi bi-info-circle me-1"></i>
                  For support, contact your system administrator
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
