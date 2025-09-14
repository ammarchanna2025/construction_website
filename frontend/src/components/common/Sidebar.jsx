import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      icon: "bi-speedometer2",
      label: "Dashboard",
      path: "/admin/dashboard",
      active: location.pathname === "/admin/dashboard"
    },
    {
      icon: "bi-tools",
      label: "Services",
      path: "/admin/services",
      active: location.pathname.includes("/admin/services")
    },
    {
      icon: "bi-building",
      label: "Projects",
      path: "/admin/projects",
      active: location.pathname.includes("/admin/projects")
    },
    {
      icon: "bi-newspaper",
      label: "Articles",
      path: "/admin/articles",
      active: location.pathname.includes("/admin/articles")
    },
    {
      icon: "bi-chat-quote",
      label: "Testimonials",
      path: "/admin/testimonials",
      active: location.pathname.includes("/admin/testimonials")
    },
    {
      icon: "bi-people",
      label: "Members",
      path: "/admin/members",
      active: location.pathname.includes("/admin/members")
    }
  ];

  return (
    <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="d-flex align-items-center justify-content-between">
      
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
      </div>

      <div className="sidebar-menu">
        <ul className="nav flex-column">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a
                href={item.path}
                className={`nav-link ${item.active ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button
          onClick={logoutHandler}
          className="btn btn-danger w-100"
          title={isCollapsed ? 'Logout' : ''}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          {!isCollapsed && "Logout"}
        </button>
      </div>

      <style>{`
        .admin-sidebar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          padding: 1.5rem;
          color: white;
          min-height: 600px;
          position: sticky;
          top: 20px;
          transition: all 0.3s ease;
          width: 280px;
        }

        .admin-sidebar.collapsed {
          width: 80px;
          padding: 1rem 0.5rem;
        }

        .sidebar-header {
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .sidebar-menu {
          flex: 1;
        }

        .nav-link {
          color: rgba(255,255,255,0.8) !important;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: white !important;
          transform: translateX(5px);
        }

        .nav-link.active {
          background: rgba(255,255,255,0.2);
          color: white !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .nav-link i {
          font-size: 1.1rem;
          width: 20px;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.2);
        }

        .btn-danger {
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          border: none;
          border-radius: 10px;
          padding: 0.75rem;
          font-weight: 500;
        }

        .btn-danger:hover {
          background: linear-gradient(45deg, #ee5a52, #ff6b6b);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(238, 90, 82, 0.3);
        }

        .btn-outline-secondary {
          border-color: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.8);
        }

        .btn-outline-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.5);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;