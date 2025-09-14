/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AdminHeader from "../../common/AdminHeader";
import Footer from "../../common/Footer";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../../http";
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
      placeholder: placeholder || "Testimonial",
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
    const newData = {...data, "testimonial": content, "imageId" : imageId};
    const res = await fetch(apiUrl + "testimonials", {
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
      navigate("/admin/testimonials");
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
                    <i className="bi bi-plus-circle me-2"></i>
                    Create New Testimonial
                  </h1>
                  <Link to="/admin/testimonials" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Testimonials
                  </Link>
                </div>

                {/* Form Card */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Testimonial Information</h6>
                  </div>
                  <div className="card-body"
                    style={{
                      maxHeight: 'calc(100vh - 200px)',
                      overflowY: 'auto',
                      padding: '2rem'
                    }}
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              <i className="bi bi-person me-2"></i>Client Name <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("title", {
                                required: "The client name field is required",
                              })}
                              type="text"
                              className={`form-control ${
                                errors.title && "is-invalid"
                              }`}
                              placeholder="Enter client name"
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title?.message}</div>}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="citation" className="form-label">
                              <i className="bi bi-building me-2"></i>Company/Position <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("citation", {
                                required: "The citation field is required",
                              })}
                              type="text"
                              className={`form-control ${
                                errors.citation && "is-invalid"
                              }`}
                              placeholder="Company name or position"
                            />
                            {errors.citation && <div className="invalid-feedback">{errors.citation?.message}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                          <i className="bi bi-chat-quote me-2"></i>Testimonial Content <span className="text-danger">*</span>
                        </label>
                        <JoditEditor
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1}
                          onBlur={(newContent) => setContent(newContent)}
                          onChange={(newContent) => {}}
                        />
                        <div className="form-text">Write the testimonial content from the client</div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                              <i className="bi bi-image me-2"></i>Client Photo
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFile}
                              accept="image/*"
                            />
                            <div className="form-text">Upload a photo of the client (optional)</div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                              <i className="bi bi-toggle-on me-2"></i>Status
                            </label>
                            <select {...register("status")} className="form-select">
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Submit Buttons - Fixed at bottom with better spacing */}
                      <div className="form-actions mt-4 pt-3 border-top">
                        <div className="d-flex gap-3 justify-content-end">
                          <Link to="/admin/testimonials" className="btn btn-secondary">
                            <i className="bi bi-x-circle me-2"></i>
                            Cancel
                          </Link>
                          <button
                            disabled={isDisable}
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            {isDisable ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating Testimonial...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Create Testimonial
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Create;
