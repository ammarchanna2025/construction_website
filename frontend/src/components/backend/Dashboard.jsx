import Header from "../common/Header";
import Footer from "../common/footer";
import Sidebar from "../common/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    try {
      const parsedUserInfo = JSON.parse(userInfo);
      if (!parsedUserInfo || !parsedUserInfo.token) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Error parsing userInfo:", error);
      navigate("/admin/login"); // Redirect if there's an error parsing userInfo
    }
  }, [navigate]);
  return (
    <>
      <Header></Header>
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
              {/* Sidebar */}
            </div>
            <div className="col-md-9 dashboard">
              {/* Dashboard */}
              <div className="card shadow border-0">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <h4>Welcome to admin console</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
