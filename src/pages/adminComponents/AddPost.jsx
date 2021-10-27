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

const AddPost = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const date = new Date();
  const { allPosts, getPosts, setAllPosts } = useContext(AuthContext);
  const [postImage, setPostImage] = useState(null);
  const [postHeading, setPostHeading] = useState(null);
  const [postDescription, setPostDescription] = useState(null);
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [featured, setFeatured] = useState(false);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          // console.log(file);
          setPostImage(file);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPostImage(null);
    }
  };
  const uploadPost = () => {
    setPostLoading(true);
    setPostImage(null);
    if (postImage) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const imageName = postImage.name + date.getTime();
      const storageRef = ref(storage, "posts/" + imageName);
      const uploadTask = uploadBytesResumable(storageRef, postImage, metadata);
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
            addDoc(collection(db, "posts"), {
              url: downloadURL,
              title: postHeading,
              desc: postDescription,
              featured: featured,
              ref: imageName,
            })
              .then((snap) => {
                enqueueSnackbar("Post Saved Successfully", {
                  variant: "success",
                });
                // console.log(snap);
                setPostImage(null);
                setPostHeading("");
                setPostDescription("");
                setPostLoading(false);
                setOpen(false);
                getPosts();
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
      setPostLoading(false);
    }
  };
  const deletePost = (id) => {
    // console.log("Here");
    try {
      deleteDoc(doc(db, "posts", id)).then(() => {
        enqueueSnackbar("Post Deleted Successfully", {
          variant: "success",
        });
        // console.log("Successfully Deleted");
        setAllPosts(
          allPosts.filter((post) => {
            return post.id !== id;
          })
        );
      });
    } catch (error) {
      // console.log(error);
    }
  };
  const toggleFeatured = (id, value) => {
    // console.log("Here");
    try {
      const cityRef = doc(db, "posts", id);
      setDoc(cityRef, { featured: !value }, { merge: true });
      getPosts();
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div>
      <h4 className="container mt-5">Add Posts</h4>
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
                  disabled={postLoading}
                />
                <ProgressBar progress={imageUploadPercent} />
                <div className="mb-3 mt-3">
                  <label for="postHeading" className="form-label">
                    Post Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postHeading"
                    value={postHeading}
                    disabled={postLoading}
                    onChange={(e) => setPostHeading(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="postDescription" className="form-label">
                    Post Description
                  </label>
                  <textarea
                    type="text"
                    rows={6}
                    className="form-control"
                    id="postDescription"
                    value={postDescription}
                    disabled={postLoading}
                    onChange={(e) => setPostDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={featured}
                      id="flexCheckDefault"
                      onClick={() => setFeatured(!featured)}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Featured Product
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mb-2 me-2"
              disabled={postLoading}
              onClick={() => uploadPost()}>
              Save
            </button>
            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                setPostImage(null);
                setPostHeading("");
                setPostDescription("");
                setOpen(false);
                setPostLoading(false);
              }}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary mb-2"
            onClick={() => setOpen(true)}>
            Add a post
          </button>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Image</th>
              <th scope="col">Heading</th>
              <th scope="col">Featured</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.length > 0 &&
              allPosts.map((post, i) => {
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
                            src={post.url}
                            alt="hello"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{post.title}</td>
                    <td>{post.featured ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-primary mb-2 me-2"
                        onClick={() => deletePost(post.id)}>
                        Delete
                      </button>
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => toggleFeatured(post.id, post.featured)}>
                        {post.featured ? "Remove Featured" : "Add Featured"}
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

export default AddPost;
