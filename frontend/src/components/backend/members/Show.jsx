import AdminHeader from "../../common/AdminHeader";
import Footer from "../../common/Footer";
import Sidebar from "../../common/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../../http";
import { toast } from "react-toastify";

const Show = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await fetch(apiUrl + "members", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    setMembers(result.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const deleteMember = async (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const res = await fetch(apiUrl + "members/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      if (result.status === true) {
        const newMembers = members.filter((member) => member.id !== id);
        setMembers(newMembers);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

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
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    <i className="bi bi-people me-2"></i>
                    Members Management
                  </h1>
                  <Link to="/admin/members/create" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Create Member
                  </Link>
                </div>

                {/* Members Table */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Members</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members &&
                            members.map((member) => {
                              return (
                                <tr key={member.id}>
                                  <td>{member.id}</td>
                                  <td>
                                    {member.image && (
                                      <img
                                        className="w-50"
                                        src={`http://localhost:8000/uploads/members/${member.image}`}
                                        alt={member.name}
                                      />
                                    )}
                                  </td>
                                  <td>{member.name}</td>
                                  <td>{member.designation}</td>
                                  <td>{member.email || 'N/A'}</td>
                                  <td>
                                    <span className={`badge ${member.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                                      {member.status === 1 ? 'Active' : 'Blocked'}
                                    </span>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/admin/members/edit/${member.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="bi bi-pencil me-1"></i>Edit
                                    </Link>
                                    <button
                                      onClick={() => deleteMember(member.id)}
                                      className="btn btn-danger btn-sm"
                                    >
                                      <i className="bi bi-trash me-1"></i>Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Show;
