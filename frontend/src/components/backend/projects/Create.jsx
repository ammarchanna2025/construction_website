/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Header from "../../common/Header";
import Footer from "../../common/footer";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useRef, useMemo, useState } from "react";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState('');
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const newData = {...data, "content": content, "imageId" : imageId};
    const res = await fetch(apiUrl + "projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });

    const result = await res.json();
    if (result.status == true) {
      toast.success(result.message);
      navigate("/admin/projects");
    } else {
      toast.error(result.message);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image",file);

    await fetch(apiUrl + "temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData
    }).then(response => response.json())
    .then(result => {
        if(result.status == false){
          toast.error(result.errors.image[0]);

        }
        else{
          setImageId(result.data.id)

        }
    });
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
                    <h4 className="h5">Projects / Create</h4>
                    <Link
                      to="/admin/projects"
                      className="btn btn-primary large"
                    >
                      Back
                    </Link>
                  </div>
                  <hr />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        {...register("title", {
                          required: "The title field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.title && "is-invalid"
                        }`}
                      />
                      {errors.title && <p>{errors.title?.message}</p>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Slug
                      </label>
                      <input
                        {...register("slug", {
                          required: "The slug field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.slug && "is-invalid"
                        }`}
                      />
                      {errors.slug && <p>{errors.slug?.message}</p>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Construction Type
                      </label>
                      <input
                        {...register("construction_type", {
                          required: "The construction_type field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.construction_type && "is-invalid"
                        }`}
                      />
                      {errors.construction_type && <p>{errors.construction_type?.message}</p>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Sector
                      </label>
                      <input
                        {...register("sector", {
                          required: "The sector field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.sector && "is-invalid"
                        }`}
                      />
                      {errors.sector && <p>{errors.sector?.message}</p>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Location
                      </label>
                      <input
                        {...register("location", {
                          required: "The location field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.location && "is-invalid"
                        }`}
                      />
                      {errors.location && <p>{errors.location?.message}</p>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Short Description
                      </label>
                      <textarea
                        {...register("short_desc")}
                        className="form-control"
                        rows={4}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Content
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">Image</label>
                      <br />
                      <input type="file" onChange={handleFile}/>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select {...register("status")} className="form-control">
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>

                    <button disabled={isDisable} className="btn btn-primary small">Submit</button>
                  </form>
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

export default Create;
