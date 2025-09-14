import AdminHeader from "../../common/AdminHeader";
import Footer from "../../common/Footer";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../../http";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../../../assets/css/admin.scss";

const Create = () => {
  const [imageId, setImageId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newData = { ...data, imageId: imageId };

      const res = await fetch(apiUrl + "members", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (result.status === true) {
        toast.success(result.message);
        navigate("/admin/members");
      } else {
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            toast.error(result.errors[key][0]);
          });
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred while creating the member");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    const res = await fetch(apiUrl + "temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.status === false) {
      toast.error(result.errors.image[0]);
    } else {
      setImageId(result.data.id);
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
                    <i className="bi bi-plus-circle me-2"></i>
                    Create New Member
                  </h1>
                  <Link to="/admin/members" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Members
                  </Link>
                </div>

                {/* Form Card */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Member Information</h6>
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
                            <label htmlFor="name" className="form-label">
                              <i className="bi bi-person me-2"></i>Full Name <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("name", { required: "Name is required" })}
                              type="text"
                              id="name"
                              className={`form-control ${errors.name ? "is-invalid" : ""}`}
                              placeholder="Enter member's full name"
                            />
                            {errors.name && (
                              <div className="invalid-feedback">{errors.name?.message}</div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="designation" className="form-label">
                              <i className="bi bi-briefcase me-2"></i>Designation <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("designation", { required: "Designation is required" })}
                              type="text"
                              id="designation"
                              className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                              placeholder="e.g., Project Manager, Engineer"
                            />
                            {errors.designation && (
                              <div className="invalid-feedback">{errors.designation?.message}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              <i className="bi bi-envelope me-2"></i>Email Address
                            </label>
                            <input
                              {...register("email", {
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: "Invalid email format"
                                }
                              })}
                              type="email"
                              id="email"
                              className={`form-control ${errors.email ? "is-invalid" : ""}`}
                              placeholder="Enter email address"
                            />
                            {errors.email && (
                              <div className="invalid-feedback">{errors.email?.message}</div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                              <i className="bi bi-telephone me-2"></i>Phone Number
                            </label>
                            <input
                              {...register("phone")}
                              type="text"
                              id="phone"
                              className="form-control"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                          <i className="bi bi-card-text me-2"></i>Bio
                        </label>
                        <textarea
                          {...register("bio")}
                          id="bio"
                          className="form-control"
                          rows="4"
                          placeholder="Enter member's professional bio"
                        ></textarea>
                        <div className="form-text">Brief professional background and experience</div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="linkedin" className="form-label">
                              <i className="bi bi-linkedin me-2"></i>LinkedIn URL
                            </label>
                            <input
                              {...register("linkedin")}
                              type="url"
                              id="linkedin"
                              className="form-control"
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="twitter" className="form-label">
                              <i className="bi bi-twitter me-2"></i>Twitter URL
                            </label>
                            <input
                              {...register("twitter")}
                              type="url"
                              id="twitter"
                              className="form-control"
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                              <i className="bi bi-image me-2"></i>Profile Photo
                            </label>
                            <input
                              onChange={handleFile}
                              type="file"
                              id="image"
                              className="form-control"
                              accept="image/*"
                            />
                            <div className="form-text">Upload a professional photo of the member</div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                              <i className="bi bi-toggle-on me-2"></i>Status <span className="text-danger">*</span>
                            </label>
                            <select
                              {...register("status", { required: "Status is required" })}
                              id="status"
                              className={`form-select ${errors.status ? "is-invalid" : ""}`}
                            >
                              <option value="">Select Status</option>
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                            {errors.status && (
                              <div className="invalid-feedback">{errors.status?.message}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit Buttons - Fixed at bottom with better spacing */}
                      <div className="form-actions mt-4 pt-3 border-top">
                        <div className="d-flex gap-3 justify-content-end">
                          <Link to="/admin/members" className="btn btn-secondary">
                            <i className="bi bi-x-circle me-2"></i>
                            Cancel
                          </Link>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary btn-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating Member...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Create Member
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
