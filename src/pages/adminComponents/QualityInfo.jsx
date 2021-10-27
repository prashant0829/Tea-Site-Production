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

const QualityInfo = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { currentUser, companyDetails, getCompanyDetails } =
    useContext(AuthContext);
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [image, setImage] = useState(null);
  const [qualityContent, setQualityContent] = useState("");
  const [qualityImage, setQualityImage] = useState(null);

  useEffect(() => {
    setQualityImage(companyDetails.qualityImage);
    setQualityContent(companyDetails.qualityContent);
  }, [companyDetails]);

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

  const saveDetails = (e) => {
    e.preventDefault();
    setQualityImage(null);
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "images/" + "qualityImage");
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
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
            const cityRef = doc(db, "company-profile", "profile");
            setDoc(
              cityRef,
              {
                qualityImage: downloadURL,
              },
              { merge: true }
            ).then(() => {
              // console.log("Quality Image Saved");
              getCompanyDetails();
              saveContent();
            });
          });
        }
      );
    } else {
      saveContent();
    }
  };

  const saveContent = () => {
    const cityRef = doc(db, "company-profile", "profile");
    setDoc(
      cityRef,
      {
        qualityContent: qualityContent,
      },
      { merge: true }
    )
      .then(() => {
        // console.log("QualitySaved");
        getCompanyDetails();
        enqueueSnackbar("Quality Details Saved Successfully", {
          variant: "success",
        });
      })
      .catch((e) => {
        // console.log("some error occured while saving quality details");
      });
  };

  if (currentUser)
    return (
      <div>
        <div className="container mt-5">
          <h4 className="text-center">Quality Details</h4>
          <div className="d-flex justify-qualityContent-between p-1">
            <input
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                onImageChange(e);
              }}
            />
          </div>
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <div className=" col-xs-12 col-sm-12 col-md-4 col-lg-3 d-flex flex-column justify-qualityContent-between p-1">
              {qualityImage ? (
                <img
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    boxSizing: "border-box",
                    marginBottom: "6px",
                  }}
                  src={qualityImage}
                  alt="hello"
                />
              ) : (
                <>
                  <ProgressBar progress={imageUploadPercent} />
                </>
              )}
            </div>
          </div>
          <form>
            <div className="row">
              <div className="col-xs-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label for="company-qualityContent" className="form-label">
                    Quality Text
                  </label>
                  <textarea
                    rows={6}
                    type="text"
                    className="form-control"
                    id="company-qualityContent"
                    value={qualityContent}
                    onChange={(e) => setQualityContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={(e) => {
                saveDetails(e);
              }}>
              Save Quality Details
            </button>
          </form>
        </div>
      </div>
    );
};

export default QualityInfo;
