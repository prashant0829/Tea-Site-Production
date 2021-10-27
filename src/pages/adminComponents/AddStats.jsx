import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/ContextApi";
import { db, storage } from "../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ProgressBar from "../../components/ProgressBar";
import { useSnackbar } from "notistack";

const AddStats = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { currentUser, stats, getStats } = useContext(AuthContext);
  const [logoUploadPercent, setLogoUploadPercent] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [state, setState] = useState({
    url: "",
    ref: "",
    content: "",
    heading1: "",
    count1: "",
    description1: "",
    heading2: "",
    count2: "",
    description2: "",
    heading3: "",
    count3: "",
    description3: "",
    heading4: "",
    count4: "",
    description4: "",
  });

  useEffect(() => {
    setState(stats);
  }, [stats]);
  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          // console.log(file);
          setImage(file);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const UploadBackground = () => {
    setImageUploading(true);
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "images/" + "StatsBg");
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          setLogoUploadPercent(progress);
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
            const docRef = doc(db, "company-stats", "stats");
            setDoc(
              docRef,
              {
                url: downloadURL,
                ref: "images/" + "StatsBg",
              },
              { merge: true }
            ).then(() => {
              // // console.log("LogoSaved");
              enqueueSnackbar("Background Saved Successfully", {
                variant: "success",
              });
              setImage(null);
              setImageUploading(false);
              getStats();
            });
          });
        }
      );
    } else {
      alert("Please upload an image first.");
    }
  };

  const saveDetails = (e) => {
    e.preventDefault();
    const document = doc(db, "company-stats", "stats");
    setDoc(document, state, { merge: true })
      .then((snapshot) => {
        getStats();
        enqueueSnackbar("Stats Saved Successfully", {
          variant: "success",
        });
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  if (currentUser)
    return (
      <div>
        <div className="container">
          <h4>Add Stats Details</h4>
          <div className="d-flex justify-content-between p-1">
            <h6>Upload Background Image</h6>
            <input
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                onImageChange(e);
              }}
            />

            <button
              className="btn btn-primary"
              onClick={() => UploadBackground()}>
              Upload
            </button>
          </div>
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <div className=" col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column justify-content-between p-1">
              {!imageUploading && stats.url ? (
                <img
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    boxSizing: "border-box",
                    marginBottom: "6px",
                  }}
                  src={stats.url}
                  alt="img"
                />
              ) : (
                <>
                  <ProgressBar progress={logoUploadPercent} />
                </>
              )}
            </div>
          </div>
          <form>
            <div className="row">
              <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="mb-3">
                  <label for="paragraph" className="form-label">
                    Paragraph
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="paragraph"
                    value={state.content}
                    onChange={(e) =>
                      setState({ ...state, content: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="heading1" className="form-label">
                    Heading 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="heading1"
                    value={state.heading1}
                    onChange={(e) =>
                      setState({ ...state, heading1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="count1" className="form-label">
                    Count 1
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="count1"
                    value={state.count1}
                    onChange={(e) =>
                      setState({ ...state, count1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="description1" className="form-label">
                    Description 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description1"
                    value={state.description1}
                    onChange={(e) =>
                      setState({ ...state, description1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="heading2" className="form-label">
                    Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="heading2"
                    value={state.heading2}
                    onChange={(e) =>
                      setState({ ...state, heading2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="count2" className="form-label">
                    Count 2
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="count2"
                    value={state.count2}
                    onChange={(e) =>
                      setState({ ...state, count2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="description2" className="form-label">
                    Description 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description2"
                    value={state.description2}
                    onChange={(e) =>
                      setState({ ...state, description2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="heading3" className="form-label">
                    Heading 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="heading3"
                    value={state.heading3}
                    onChange={(e) =>
                      setState({ ...state, heading3: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="count3" className="form-label">
                    Count 3
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="count3"
                    value={state.count3}
                    onChange={(e) =>
                      setState({ ...state, count3: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="description3" className="form-label">
                    Description 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description3"
                    value={state.description3}
                    onChange={(e) =>
                      setState({ ...state, description3: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="heading4" className="form-label">
                    Heading 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="heading4"
                    value={state.heading4}
                    onChange={(e) =>
                      setState({ ...state, heading4: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="count4" className="form-label">
                    Count 4
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="count4"
                    value={state.count4}
                    onChange={(e) =>
                      setState({ ...state, count4: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label for="description4" className="form-label">
                    Description 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description4"
                    value={state.description4}
                    onChange={(e) =>
                      setState({ ...state, description4: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                saveDetails(e);
              }}>
              Save Details
            </button>
          </form>
        </div>
      </div>
    );
};

export default AddStats;
