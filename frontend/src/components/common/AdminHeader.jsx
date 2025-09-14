/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      try {
        setUserInfo(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand d-flex align-items-center" href="/admin/dashboard">
            <i className="bi bi-building-gear text-primary me-2" style={{fontSize: '1.5rem'}}></i>
            <span className="fw-bold text-primary">ARC Construction</span>
            <span className="badge bg-primary ms-2">Admin</span>
          </a>

          {/* Right Side Navigation - Simplified */}
          <div className="d-flex align-items-center ms-auto">
            {/* Logout Button */}
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .admin-header {
          position: sticky;
          top: 0;
          z-index: 1020;
          background: white;
          border-bottom: 1px solid #e3e6f0;
        }

        .navbar-brand {
          font-size: 1.25rem;
          text-decoration: none;
        }

        .navbar-brand:hover {
          text-decoration: none;
        }

        .btn-outline-danger {
          border-color: #e74a3b;
          color: #e74a3b;
        }

        .btn-outline-danger:hover {
          background-color: #e74a3b;
          border-color: #e74a3b;
          color: white;
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;
