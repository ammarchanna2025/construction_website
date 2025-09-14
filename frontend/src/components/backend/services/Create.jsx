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
import useFormHandler from "../../../hooks/useFormHandler";
import FormField from "../../common/FormField";
import LoadingSpinner from "../../common/LoadingSpinner";
import { api } from "../../../utils/api";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imageId, setImageId] = useState('');

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );

  const navigate = useNavigate();

  // Use our enhanced form handler
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    getFieldProps,
    handleSubmit: handleFormSubmit,
    hasFieldError
  } = useFormHandler({
    title: '',
    short_desc: '',
    slug: '',
    status: '1'
  });

  // Legacy form hook for compatibility
  const {
    register,
    handleSubmit,
    formState: { errors: legacyErrors },
  } = useForm();
  // Enhanced form submission with better error handling
  const onSubmit = async () => {
    const submitData = {
      ...formData,
      content: content,
      imageId: imageId
    };

    return await api.post('services', submitData);
  };

  // Validation rules
  const validationRules = {
    title: { required: true, minLength: 3, maxLength: 255 },
    short_desc: { required: true, minLength: 10, maxLength: 500 },
    slug: { required: true, minLength: 3, maxLength: 255 }
  };

  // Handle form submission
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    // Validate content
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    const result = await handleFormSubmit(onSubmit, validationRules, {
      successMessage: 'Service created successfully!',
      onSuccess: () => navigate('/admin/services')
    });
  };

  // Legacy onSubmit for compatibility
  const legacyOnSubmit = async (data) => {
    const newData = {...data, "content": content, "imageId" : imageId};
    const res = await fetch(apiUrl + "services", {
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
      navigate("/admin/services");
    } else {
      toast.error(result.message);
    }
  };

  // Enhanced file upload handler
  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF)');
      e.target.value = '';
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await api.upload('temp-images', formData);

      if (!result.error) {
        setImageId(result.data.id);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('File upload error:', error);
      e.target.value = '';
    }
  };

  // Legacy file handler for compatibility
  const legacyHandleFile = async (e) => {
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
                    Create New Service
                  </h1>
                  <Link to="/admin/services" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Services
                  </Link>
                </div>

                {/* Form Card */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Service Information</h6>
                  </div>
                  <div className="card-body"
                    style={{
                      maxHeight: 'calc(100vh - 200px)',
                      overflowY: 'auto',
                      padding: '2rem'
                    }}
                  >

                  {/* Enhanced form with better error handling */}
                  <form onSubmit={handleFormSubmission}>
                    <FormField
                      label="Service Name"
                      name="title"
                      type="text"
                      required
                      placeholder="Enter service name"
                      {...getFieldProps('title')}
                      error={errors.title}
                      helpText="Enter a descriptive name for the service"
                    />

                    {/* Legacy form for compatibility */}
                    <div style={{ display: 'none' }}>
                      <form onSubmit={handleSubmit(legacyOnSubmit)}>
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
                              legacyErrors.title && "is-invalid"
                            }`}
                          />
                          {legacyErrors.title && <p>{legacyErrors.title?.message}</p>}
                        </div>
                      </form>
                    </div>

                    <FormField
                      label="Slug"
                      name="slug"
                      type="text"
                      required
                      placeholder="Enter URL slug (e.g., web-development)"
                      {...getFieldProps('slug')}
                      error={errors.slug}
                      helpText="URL-friendly version of the service name"
                    />

                    <FormField
                      label="Short Description"
                      name="short_desc"
                      type="textarea"
                      required
                      placeholder="Enter a brief description of the service"
                      rows={4}
                      {...getFieldProps('short_desc')}
                      error={errors.short_desc}
                      helpText="Brief summary that will appear in service listings"
                    />

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Content <span className="text-danger">*</span>
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {}}
                      />
                      <div className="form-text">Detailed description of the service</div>
                    </div>

                    <FormField
                      label="Service Image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      helpText="Upload an image for the service (JPEG, PNG, GIF - Max 5MB)"
                    />

                    <FormField
                      label="Status"
                      name="status"
                      type="select"
                      options={[
                        { value: '1', label: 'Active' },
                        { value: '0', label: 'Inactive' }
                      ]}
                      {...getFieldProps('status')}
                      error={errors.status}
                    />

                    {/* Submit Buttons - Fixed at bottom with better spacing */}
                    <div className="form-actions mt-4 pt-3 border-top">
                      <div className="d-flex gap-3 justify-content-end">
                        <Link to="/admin/services" className="btn btn-secondary">
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
                              Creating Service...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Create Service
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
