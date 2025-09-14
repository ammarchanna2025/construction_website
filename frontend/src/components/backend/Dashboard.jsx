import AdminHeader from "../common/AdminHeader";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl, token } from "../../http";
import { toast } from "react-toastify";
import "../../assets/css/admin.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    try {
      const parsedUserInfo = JSON.parse(userInfo);
      if (!parsedUserInfo || !parsedUserInfo.token) {
        navigate("/admin/login");
      } else {
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error parsing userInfo:", error);
      navigate("/admin/login");
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(apiUrl + "dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token()}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setDashboardData(result.data);
      } else {
        // Fallback to mock data if API is not available
        console.warn("API not available, using mock data");
        setDashboardData(getMockDashboardData());
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use mock data as fallback
      setDashboardData(getMockDashboardData());
    } finally {
      setLoading(false);
    }
  };

  

  const StatCard = ({ title, count, icon, color, subtitle }) => (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
              {subtitle && <div className="text-xs text-muted">{subtitle}</div>}
            </div>
            <div className="col-auto">
              <i className={`bi ${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ title, items, type }) => (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Recent {title}</h6>
        <a href={`/admin/${type}`} className="btn btn-sm btn-primary">View All</a>
      </div>
      <div className="card-body">
        {items && items.length > 0 ? (
          <div className="list-group list-group-flush">
            {items.map((item, index) => (
              <div key={index} className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">
                      {new Date(item.created_at).toLocaleDateString()}
                    </small>
                  </div>
                  <span className={`badge ${item.status ? 'badge-success' : 'badge-secondary'}`}>
                    {item.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center">No recent {type} found</p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <AdminHeader />
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3">
                <Sidebar />
              </div>
              <div className="col-lg-9">
                <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className="dashboard-content">
                {/* Welcome Banner */}
                <div className="welcome-banner mb-4">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body p-4" style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '0.5rem'
                    }}>
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h2 className="text-white mb-2">
                            <i className="bi bi-emoji-smile me-2"></i>
                            Welcome to ARC Construction Admin Dashboard
                          </h2>
                          <p className="text-white-50 mb-0 lead">
                            Manage your construction business with ease. Monitor projects, services, articles, and more from this central hub.
                          </p>
                        </div>
                        <div className="col-md-4 text-end">
                          <div className="welcome-stats text-white">
                            <div className="d-flex justify-content-end align-items-center">
                              <div className="text-center me-4">
                                <i className="bi bi-calendar3 display-6 opacity-75"></i>
                                <div className="mt-2">
                                  <small className="text-white-50">Today</small>
                                  <div className="fw-bold">
                                    {new Date().toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <i className="bi bi-clock display-6 opacity-75"></i>
                                <div className="mt-2">
                                  <small className="text-white-50">Time</small>
                                  <div className="fw-bold">
                                    {new Date().toLocaleTimeString('en-US', {
                                      timeZone: 'Asia/Karachi',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard Overview
                  </h1>
                  <div className="text-muted">
                    <i className="bi bi-calendar3 me-1"></i>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Statistics section removed for cleaner dashboard */}
                {dashboardData && (
                  <>

                    {/* Quick Actions */}
                    <div className="row">
                      <div className="col-12">
                        <div className="card shadow mb-4">
                          <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                              <i className="bi bi-lightning-fill me-2"></i>
                              Quick Actions
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2 mb-3">
                                <a href="/admin/services/create" className="btn btn-primary btn-block">
                                  <i className="bi bi-plus-circle me-2"></i>
                                  Add Service
                                </a>
                              </div>
                              <div className="col-md-2 mb-3">
                                <a href="/admin/projects/create" className="btn btn-success btn-block">
                                  <i className="bi bi-plus-circle me-2"></i>
                                  Add Project
                                </a>
                              </div>
                              <div className="col-md-2 mb-3">
                                <a href="/admin/articles/create" className="btn btn-info btn-block">
                                  <i className="bi bi-plus-circle me-2"></i>
                                  Add Article
                                </a>
                              </div>
                              <div className="col-md-2 mb-3">
                                <a href="/admin/testimonials/create" className="btn btn-warning btn-block">
                                  <i className="bi bi-plus-circle me-2"></i>
                                  Add Testimonial
                                </a>
                              </div>
                              <div className="col-md-2 mb-3">
                                <a href="/admin/members/create" className="btn btn-secondary btn-block">
                                  <i className="bi bi-plus-circle me-2"></i>
                                  Add Member
                                </a>
                              </div>
                              <div className="col-md-2 mb-3">
                                <a href="/" target="_blank" className="btn btn-outline-primary btn-block">
                                  <i className="bi bi-eye me-2"></i>
                                  View Site
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .dashboard-content {
          padding: 2rem;
          background-color: #f8f9fc;
          min-height: 100vh;
        }

        .border-left-primary {
          border-left: 0.25rem solid #4e73df !important;
        }

        .border-left-success {
          border-left: 0.25rem solid #1cc88a !important;
        }

        .border-left-info {
          border-left: 0.25rem solid #36b9cc !important;
        }

        .border-left-warning {
          border-left: 0.25rem solid #f6c23e !important;
        }

        .border-left-danger {
          border-left: 0.25rem solid #e74a3b !important;
        }

        .border-left-secondary {
          border-left: 0.25rem solid #858796 !important;
        }

        .text-primary {
          color: #4e73df !important;
        }

        .text-success {
          color: #1cc88a !important;
        }

        .text-info {
          color: #36b9cc !important;
        }

        .text-warning {
          color: #f6c23e !important;
        }

        .text-danger {
          color: #e74a3b !important;
        }

        .text-secondary {
          color: #858796 !important;
        }

        .card {
          border: none;
          border-radius: 0.35rem;
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
        }

        .card-header {
          background-color: #f8f9fc;
          border-bottom: 1px solid #e3e6f0;
        }

        .btn-block {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .badge-success {
          background-color: #1cc88a;
        }

        .badge-secondary {
          background-color: #858796;
        }

        .list-group-item {
          transition: all 0.3s ease;
        }

        .list-group-item:hover {
          background-color: #f8f9fc;
        }

        .spinner-border {
          width: 3rem;
          height: 3rem;
        }

        .fa-2x {
          font-size: 2em;
        }

        .text-gray-300 {
          color: #dddfeb !important;
        }

        .text-gray-800 {
          color: #5a5c69 !important;
        }

        .font-weight-bold {
          font-weight: 700 !important;
        }

        .text-xs {
          font-size: 0.7rem;
        }

        .text-uppercase {
          text-transform: uppercase !important;
        }

        .no-gutters {
          margin-right: 0;
          margin-left: 0;
        }

        .no-gutters > .col,
        .no-gutters > [class*="col-"] {
          padding-right: 0;
          padding-left: 0;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
