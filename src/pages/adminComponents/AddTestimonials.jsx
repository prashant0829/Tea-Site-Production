import React, { useState, useContext } from "react";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
  where,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config";
import ProgressBar from "../../components/ProgressBar";
import { AuthContext } from "../../context/ContextApi";
import { useSnackbar } from "notistack";

const AddTestimonial = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const date = new Date();
  const { allTestimonials, getTestimonials, setAllTestimonials } =
    useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [content, setContent] = useState("");
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const [testimonialLoading, setTestimonialLoading] = useState(false);
  const [featured, setFeatured] = useState(false);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          // console.log(file);
          setProfileImage(file);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setProfileImage(null);
    }
  };
  const uploadTestimonial = () => {
    setTestimonialLoading(true);
    setProfileImage(null);
    if (profileImage) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(
        storage,
        "testimonials/" + profileImage.name + date.getTime()
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        profileImage,
        metadata
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          setImageUploadPercent(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "testimonials"), {
              url: downloadURL,
              name: name,
              content: content,
              designation: designation,
            })
              .then((snap) => {
                // console.log(snap);
                enqueueSnackbar("Testimonial Saved Successfully", {
                  variant: "success",
                });
                setProfileImage(null);
                setName("");
                setContent("");
                setDesignation("");
                setTestimonialLoading(false);
                setOpen(false);
                getTestimonials();
                setFeatured(false);
                setImageUploadPercent(0);
              })
              .catch((e) => {
                // console.log(e);
              });
          });
        }
      );
    } else {
      alert("Please upload an image first.");
      setTestimonialLoading(false);
    }
  };
  const deleteTestimonials = (id) => {
    // console.log("Here");
    try {
      deleteDoc(doc(db, "testimonials", id)).then(() => {
        // console.log("Successfully Deleted");
        setAllTestimonials(
          allTestimonials.filter((testimonial) => {
            return testimonial.id !== id;
          })
        );
      });
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div>
      <h4 className="container mt-5 text-center">Add Testimonials</h4>
      <div className="container">
        {open ? (
          <>
            <div className="row">
              <div className="col-xs-12 col-md-6 col-lg-4">
                <input
                  type="file"
                  accept="image/x-png,image/jpeg"
                  onChange={(e) => {
                    onImageChange(e);
                  }}
                  disabled={testimonialLoading}
                />
                <ProgressBar progress={imageUploadPercent} />
                <div className="mb-3 mt-3">
                  <label for="nameTestimonail" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameTestimonial"
                    value={name}
                    disabled={testimonialLoading}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label for="designationTestimonail" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="designationTestimonial"
                    value={designation}
                    disabled={testimonialLoading}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="contentTestimonial" className="form-label">
                    Content
                  </label>
                  <textarea
                    type="text"
                    rows={6}
                    className="form-control"
                    id="contentTestimonial"
                    value={content}
                    disabled={testimonialLoading}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mb-2 me-2"
              disabled={testimonialLoading}
              onClick={() => uploadTestimonial()}>
              Save
            </button>
            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                setProfileImage(null);
                setName("");
                setContent("");
                setDesignation("");
                setOpen(false);
                setTestimonialLoading(false);
              }}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary mb-2"
            onClick={() => setOpen(true)}>
            Add a testimonial
          </button>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
            </tr>
          </thead>
          <tbody>
            {allTestimonials.length > 0 &&
              allTestimonials.map((testimonial, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <div className="d-flex" style={{ flexWrap: "wrap" }}>
                        <div className=" col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column justify-content-between p-1">
                          <img
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                              boxSizing: "border-box",
                              marginBottom: "6px",
                            }}
                            src={testimonial.url}
                            alt="hello"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{testimonial.name}</td>
                    <td>
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => deleteTestimonials(testimonial.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddTestimonial;
