import Header from "../../common/Header";
import Footer from "../../common/footer";
import Sidebar from "../../common/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
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
      <Header></Header>

      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              {/* Dashboard */}
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Projects</h4>
                    <Link to="/admin/projects/create" className="btn btn-primary large">
                      Create
                    </Link>
                  </div>
                  <hr />

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Construction Type</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
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
                                {
                                (project.status == 1) ? 'Active' : 'Block'
                                }
                              </td>
                              <td>
                                <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-primary btn-sm ">Edit</Link>
                                <Link onClick={()=> deleteProjects(project.id)} href="#" className="btn btn-secondary btn-sm ms-3">Delete</Link>
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
      </main>

      <Footer></Footer>
    </>
  );
};

export default Show;
