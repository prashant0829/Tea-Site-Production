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

const AddCarousels = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { currentUser, companyDetails, getCompanyDetails } =
    useContext(AuthContext);
  const [logoUploadPercent, setLogoUploadPercent] = useState(0);
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [shortAbout, setShortAbout] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [bigheading1, setBigheading1] = useState("");
  const [bigheading2, setBigheading2] = useState("");
  const [copyrightYear, setCopyrightYear] = useState("");
  const [contactNumber, setContactNumber] = useState(
    companyDetails.contactNumber
  );
  const [contactNumber2, setContactNumber2] = useState(
    companyDetails.contactNumber2
  );
  const [welcomeSection, setWelcomeSection] = useState([]);

  useEffect(() => {
    setLogo(companyDetails.logo);
    setEmail(companyDetails.email);
    setName(companyDetails.name);
    setContactNumber(companyDetails.contactNumber);
    setContactNumber2(companyDetails.contactNumber2);
    setFacebook(companyDetails.facebook);
    setInstagram(companyDetails.instagram);
    setAddress(companyDetails.address);
    setWebsite(companyDetails.website);
    setTwitter(companyDetails.twitter);
    setShortAbout(companyDetails.shortAbout);
    setBigheading1(companyDetails.bigheading1);
    setBigheading2(companyDetails.bigheading2);
    setCopyrightYear(companyDetails.copyrightYear);
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

  const uploadLogo = () => {
    if (image) {
      setLogo(null);
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "images/" + "logo");
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
            const cityRef = doc(db, "company-profile", "profile");
            setDoc(
              cityRef,
              {
                logo: downloadURL,
              },
              { merge: true }
            ).then(() => {
              // console.log("LogoSaved");
              setLogoUploadPercent(0);
              getCompanyDetails();
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
    const document = doc(db, "company-profile", "profile");
    setDoc(
      document,
      {
        email: email,
        name: name,
        contactNumber: contactNumber,
        contactNumber2: contactNumber2,
        facebook: facebook,
        instagram: instagram,
        website: website,
        address: address,
        twitter: twitter,
        shortAbout: shortAbout,
        bigheading1: bigheading1,
        bigheading2: bigheading2,
        copyrightYear: copyrightYear,
      },
      { merge: true }
    )
      .then((snapshot) => {
        getCompanyDetails();
        enqueueSnackbar("Company Details Saved Successfully", {
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
          <h4>Company Details</h4>
          <div className="d-flex justify-content-between p-1">
            <input
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                onImageChange(e);
              }}
            />

            <button
              className="btn btn-primary mb-2"
              onClick={() => uploadLogo()}>
              Upload
            </button>
          </div>
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <div className=" col-xs-12 col-sm-12 col-md-4 col-lg-3 d-flex flex-column justify-content-between p-1">
              {logo ? (
                <img
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    boxSizing: "border-box",
                    marginBottom: "6px",
                  }}
                  src={logo}
                  alt="hello"
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
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="company-name" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="short-about" className="form-label">
                    Short About
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="short-about"
                    value={shortAbout}
                    onChange={(e) => setShortAbout(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="contact-number" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact-number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="contact-number-2" className="form-label">
                    Alternate Contact Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact-number-2"
                    value={contactNumber2}
                    onChange={(e) => setContactNumber2(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="facebook" className="form-label">
                    Facebook Link
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="twitter" className="form-label">
                    Twitter Link
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="instagram" className="form-label">
                    Instagram Link
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="website" className="form-label">
                    Website Link
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="bigheading1" className="form-label">
                    Big Heading 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bigheading1"
                    value={bigheading1}
                    onChange={(e) => setBigheading1(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="bigheading2" className="form-label">
                    Big Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bigheading2"
                    value={bigheading2}
                    onChange={(e) => setBigheading2(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="mb-3">
                  <label for="copyrightYear" className="form-label">
                    Copyright year
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="copyrightYear"
                    value={copyrightYear}
                    onChange={(e) => setCopyrightYear(e.target.value)}
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

export default AddCarousels;
