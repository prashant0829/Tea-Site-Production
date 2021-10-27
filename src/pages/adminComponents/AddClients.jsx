import React, { useContext, useEffect, useState } from "react";
import {
  doc,
  addDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/ContextApi";
import { db, storage } from "../../config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useSnackbar } from "notistack";

const AddCarousels = () => {
  const date = new Date();
  const { currentUser, getClients, allClients, setAllClients } =
    useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          // // console.log(file);
          setImage(file);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const uploadToFirebase = () => {
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const imageName = image.name + date.getTime();
      const storageRef = ref(storage, "images/" + imageName);
      // console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
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
            // // console.log("File available at", downloadURL);

            addDoc(collection(db, "clients"), {
              url: downloadURL,
              ref: "images/" + imageName,
            }).then(() => {
              setImage(null);
              setAllClients([]);
              getClients();
            });
            enqueueSnackbar("Client Added Successfully", {
              variant: "success",
            });
          });
        }
      );
    } else {
      alert("Please upload an image first.");
    }
  };

  const deleteClientImage = (imageRef, id) => {
    const desertRef = ref(storage, imageRef);
    // Delete the file
    deleteDoc(doc(db, "clients", id))
      .then(() => {
        deleteObject(desertRef)
          .then(() => {
            setAllClients([]);
            getClients();
            enqueueSnackbar("Client Deleted Successfully", {
              variant: "success",
            });
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  if (currentUser)
    return (
      <div>
        <div className="container">
          <h4>Upload Clients Images</h4>
          <div className="d-flex justify-content-between p-1">
            <input
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                onImageChange(e);
              }}
              onClick={(e) => (e.target.value = null)}
            />

            <button
              className="btn btn-primary mb-2 "
              onClick={() => uploadToFirebase()}>
              Upload Client Image
            </button>
          </div>
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            {allClients.length > 0 &&
              allClients.map((doc) => {
                return (
                  <div className=" col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column justify-content-between p-1">
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        boxSizing: "border-box",
                        marginBottom: "6px",
                      }}
                      src={doc.url}
                      alt="hello"
                    />
                    <button
                      className="btn btn-primary mb-2"
                      onClick={() => deleteClientImage(doc.ref, doc.id)}>
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
};

export default AddCarousels;
