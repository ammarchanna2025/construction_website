import AdminHeader from "../../common/AdminHeader";
import Footer from "../../common/Footer";
import Sidebar from "../../common/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../../http";
import { toast } from "react-toastify";

const Show = () => {

    const [projects, setProjects] = useState([]);

  

  const fetchprojects = async () => {
    const res = await fetch(apiUrl + "projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    setProjects(result.data);
  };
  useEffect(() => {
    fetchprojects();
  }, []);

  const deleteProjects= async (id) => {
console.log(id, "id")
try{

  if(confirm("Are you sure you want to delete?")){
    const res = await fetch(apiUrl + "projects/" + id,{
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();

    console.log("result", result)
    if (result.status == true) {
      const newProjects = projects.filter(service => service.id != id)
      setProjects(newProjects);
      toast.success(result.message);
      
    } else {
      toast.error(result.message);
    }
  }
} catch (error){
  console.error(error)
}   
  
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
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    <i className="bi bi-building me-2"></i>
                    Projects Management
                  </h1>
                  <Link to="/admin/projects/create" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Create Project
                  </Link>
                </div>

                {/* Projects Table */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Projects</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Construction Type</th>
                            <th>Sector</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects &&
                            projects.map( project=> {
                               return (
                              <tr key={`project-${project.id}`}>
                                  <td>{project.id}</td>
                                  <td>{project.title}</td>
                                  <td>{project.slug}</td>
                                  <td>{project.construction_type}</td>
                                  <td>{project.sector}</td>
                                  <td>{project.location}</td>
                                  <td>
                                    <span className={`badge ${project.status == 1 ? 'bg-success' : 'bg-danger'}`}>
                                      {project.status == 1 ? 'Active' : 'Blocked'}
                                    </span>
                                  </td>
                                  <td>
                                    <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-primary btn-sm me-2">
                                      <i className="bi bi-pencil me-1"></i>Edit
                                    </Link>
                                    <button onClick={()=> deleteProjects(project.id)} className="btn btn-danger btn-sm">
                                      <i className="bi bi-trash me-1"></i>Delete
                                    </button>
                                  </td>
                              </tr>
                              )
                            })
                          }
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

      <Footer></Footer>
    </>
  );
};

export default Show;
