import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  return (
    <>

    <div className="card shadow border-0">
        <div className="card-body p-4 sidebar">
            <h4>SideBar</h4>
            <ul>
                <li><a href="/admin/dashboard">Dashboard</a></li>
                <li><a href="/admin/services">Services</a></li>
                <li><a href="/admin/projects">Projects</a></li>
                <li><a href="/admin/articles">Articles</a></li>
                <li><a href="/admin/testimonials">Testimonials</a></li>
                <li><a href="#">Members</a></li>
                <li>
                    <button onClick={logoutHandler} className="btn btn-primary small mt-4">Logout</button>
                </li>
            </ul>
        </div>
    </div>
    
    </>
  )
}

export default Sidebar