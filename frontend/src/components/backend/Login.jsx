import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/footer";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
// import { useContext } from "react";
// import { AuthContext } from "./context/Auth";
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";


const Login = () => {



  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token){
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:8000/api/authenticate",{
        method: "POST",
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
        
    });
    
    const result = await res.json();
    if (result.status === false) {
      toast.error(result.message);
      return <Navigate to='/admin/login' />;
    } else {
      // console.log('Result:', result); // Check API response
      // console.log('Result:', result.token); // Check API response
      const userInfo = {
        id: result.id,
        token: result.token,
      };
    
      console.log('UserInfo:', userInfo); // Check data before storing
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/admin/dashboard');
    }
    
  }

  // console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>
      <Header></Header>

      <main>
        <div className="container my-5 d-flex justify-content-center">
          <div className="login-form my-5">
            <div className="card border-0 shadow">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="mb-3">Login</h4>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email"
                        }
                      })}
                      type="text"
                      placeholder="Email"
                      className={`form-control ${errors.email && 'is-invalid'}`}
                    />
                    {errors.email && <p>{errors.email?.message}</p>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password
                    </label>
                    <input
                    {...register("password", {
                        required: "This field is required",
                      })}
                      type="password"
                      placeholder="Password"
                      className={`form-control ${errors.password && 'is-invalid'}`}
                    />
                    {errors.password && <p>{errors.password?.message}</p>}
                  </div>

                  <button type="submit" className="btn btn-primary large mt-3">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
};

export default Login;
