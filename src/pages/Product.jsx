import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../config";

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location.state) {
      loadPost();
    } else {
      setLoading(false);
    }
  }, []);

  const loadPost = async () => {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setProduct(docSnap.data());
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }
  };
  if (loading)
    return (
      <div className="mt-5 w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      <div
        className="container"
        style={{ minHeight: "80vh", maxWidth: "1124px", margin: "auto" }}>
        <div className="text-center">
          <p className="section-heading">Product</p>
          <div className="heading-bottom-border"></div>
        </div>
        <div className="row mt-5 mb-5" style={{ maxWidth: "1000px" }}>
          <div className="col-xs-12 col-sm-5 mb-2">
            <div
              className="col-xs-12 col-sm-12  d-flex align-items-center justify-content-center rounded"
              style={{ overflow: "hidden" }}>
              <img src={product.url} alt="" className="main-image " />
            </div>
          </div>
          <div className="col-xs-12 col-sm-7">
            <div className="">
              <h4 style={{ marginTop: "0px" }}>{product.title}</h4>
              {/* <p style={{ textAlign: "justify" }}>{product.desc}</p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: product.desc,
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
