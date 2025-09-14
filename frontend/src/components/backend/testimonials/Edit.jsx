/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token, fileUrl } from "../../../http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useRef, useMemo, useState } from "react";

const Edit = ({ placeholder }) => {
  const params = useParams();
  const editor = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
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
      const res = await fetch(apiUrl + "testimonials/" + params.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setContent(result.data.testimonial);
      setTestimonials(result.data);
      return {
        title: result.data.title,
        citation: result.data.citation,
      };
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const newData = { ...data, content: content, imageId: imageId };
    const res = await fetch(apiUrl + "testimonials/"+params.id, {
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
      navigate("/admin/testimonials");
    } else {
      toast.error(result.message);
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
          setTestimonials(result.data);
          return {
            image: result.data.image,
          };
        }
      });
  };

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
                    <h4 className="h5">Projects/ Edit</h4>
                    <Link
                      to="/admin/services"
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
                        Citation
                      </label>
                      <input
                        {...register("citation", {
                          required: "The citation field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.citation && "is-invalid"
                        }`}
                      />
                      {errors.citation && <p>{errors.citation?.message}</p>}
                    </div>

                    

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Testimonial
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
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <br />
                      <input type="file" onChange={handleFile} />
                      
                    </div>
                    <div className="pb-3">
                    {testimonials.image && (
                        <img
                          //   src={`${fileUrl}/uploads/temp/${service.image}`}
                          src={fileUrl + "uploads/temp/" +testimonials.image}
                          alt=""
                        />
                      )}
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

                    <button
                      disabled={isDisable}
                      className="btn btn-primary small"
                    >
                      Update
                    </button>
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

export default Edit;
