/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AdminHeader from "../../common/AdminHeader";
import Footer from "../../common/Footer";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token, fileUrl } from "../../../http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useRef, useMemo, useState } from "react";
import "../../../assets/css/admin.scss";

const Edit = ({ placeholder }) => {
  const params = useParams();
  const editor = useRef(null);
  const [projects, setProjects] = useState([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageId, setImageId] = useState(null);
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + "projects/" + params.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setContent(result.data.content);
      setProjects(result.data);
      return {
        title: result.data.title,
        slug: result.data.slug,
        short_desc: result.data.short_desc,
        sector: result.data.sector,
        location: result.data.location,
        construction_type: result.data.construction_type,
      };
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newData = { ...data, content: content, imageId: imageId };
      const res = await fetch(apiUrl + "projects/"+params.id, {
        method: "PUT",
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
    } catch (error) {
      toast.error("An error occurred while updating the project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    await fetch(apiUrl + "temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
          setProjects(result.data);
          return {
            // title: result.data.title,
            // slug: result.data.slug,
            // short_desc: result.data.short_desc,
            image: result.data.image,
          };
        }
      });
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
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Project
                  </h1>
                  <Link to="/admin/projects" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Projects
                  </Link>
                </div>

                {/* Form Card */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Project Information</h6>
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
                              <i className="bi bi-building me-2"></i>Project Name <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("title", {
                                required: "Project name is required",
                              })}
                              type="text"
                              id="title"
                              className={`form-control ${
                                errors.title && "is-invalid"
                              }`}
                              placeholder="Enter project name"
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title?.message}</div>}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="slug" className="form-label">
                              <i className="bi bi-link me-2"></i>URL Slug <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("slug", {
                                required: "URL slug is required",
                              })}
                              type="text"
                              id="slug"
                              className={`form-control ${
                                errors.slug && "is-invalid"
                              }`}
                              placeholder="project-url-slug"
                            />
                            {errors.slug && <div className="invalid-feedback">{errors.slug?.message}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="construction_type" className="form-label">
                              <i className="bi bi-tools me-2"></i>Construction Type <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("construction_type", {
                                required: "Construction type is required",
                              })}
                              type="text"
                              id="construction_type"
                              className={`form-control ${
                                errors.construction_type && "is-invalid"
                              }`}
                              placeholder="e.g., Residential, Commercial"
                            />
                            {errors.construction_type && <div className="invalid-feedback">{errors.construction_type?.message}</div>}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="sector" className="form-label">
                              <i className="bi bi-diagram-3 me-2"></i>Sector <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("sector", {
                                required: "Sector is required",
                              })}
                              type="text"
                              id="sector"
                              className={`form-control ${
                                errors.sector && "is-invalid"
                              }`}
                              placeholder="e.g., Healthcare, Education"
                            />
                            {errors.sector && <div className="invalid-feedback">{errors.sector?.message}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                          <i className="bi bi-geo-alt me-2"></i>Location <span className="text-danger">*</span>
                        </label>
                        <input
                          {...register("location", {
                            required: "Location is required",
                          })}
                          type="text"
                          id="location"
                          className={`form-control ${
                            errors.location && "is-invalid"
                          }`}
                          placeholder="Enter project location"
                        />
                        {errors.location && <div className="invalid-feedback">{errors.location?.message}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="short_desc" className="form-label">
                          <i className="bi bi-card-text me-2"></i>Short Description
                        </label>
                        <textarea
                          {...register("short_desc")}
                          id="short_desc"
                          className="form-control"
                          rows={4}
                          placeholder="Enter a brief description of the project"
                        ></textarea>
                        <div className="form-text">Brief summary that will appear in project listings</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                          <i className="bi bi-file-text me-2"></i>Project Details <span className="text-danger">*</span>
                        </label>
                        <JoditEditor
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1}
                          onBlur={(newContent) => setContent(newContent)}
                          onChange={(newContent) => {}}
                        />
                        <div className="form-text">Detailed description of the project</div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                              <i className="bi bi-image me-2"></i>Project Image
                            </label>
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                              onChange={handleFile}
                              accept="image/*"
                            />
                            <div className="form-text">Upload a featured image for the project</div>
                          </div>

                          {projects.image && (
                            <div className="mb-3">
                              <label className="form-label">Current Image</label>
                              <div className="border rounded p-2">
                                <img
                                  src={fileUrl + "uploads/temp/" + projects.image}
                                  alt="Current project image"
                                  className="img-fluid rounded"
                                  style={{ maxHeight: '200px' }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                              <i className="bi bi-toggle-on me-2"></i>Status
                            </label>
                            <select {...register("status")} id="status" className="form-select">
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Submit Buttons - Fixed at bottom with better spacing */}
                      <div className="form-actions mt-4 pt-3 border-top">
                        <div className="d-flex gap-3 justify-content-end">
                          <Link to="/admin/projects" className="btn btn-secondary">
                            <i className="bi bi-x-circle me-2"></i>
                            Cancel
                          </Link>
                          <button
                            disabled={isSubmitting}
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Updating Project...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Update Project
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
      <Footer></Footer>
    </>
  );
};

export default Edit;
