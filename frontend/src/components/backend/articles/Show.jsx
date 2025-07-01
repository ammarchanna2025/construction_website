import Header from "../../common/Header";
import Footer from "../../common/footer";
import Sidebar from "../../common/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const Show = () => {

    const [articles, setArticles] = useState([]);

  

  const fetcharticles = async () => {
    const res = await fetch(apiUrl + "articles", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    setArticles(result.data);
  };
  useEffect(() => {
    fetcharticles();
  }, []);

  const deleteArticles= async (id) => {
console.log(id, "id")
try{

  if(confirm("Are you sure you want to delete?")){
    const res = await fetch(apiUrl + "articles/" + id,{
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
      const newArticles = articles.filter(service => service.id != id)
      setArticles(newArticles);
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
                    <Link to="/admin/articles/create" className="btn btn-primary large">
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
                        <th>Author</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles &&
                        articles.map( article=> {
                           return (
                          <tr key={`article-${article.id}`}>
                              <td>{article.id}</td>
                              <td>{article.title}</td>
                              <td>{article.slug}</td>
                              <td>{article.author}</td>
                              <td>
                                {
                                (article.status == 1) ? 'Active' : 'Block'
                                }
                              </td>
                              <td>
                                <Link to={`/admin/articles/edit/${article.id}`} className="btn btn-primary btn-sm ">Edit</Link>
                                <Link onClick={()=> deleteArticles(article.id)} href="#" className="btn btn-secondary btn-sm ms-3">Delete</Link>
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
