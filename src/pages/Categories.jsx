import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/ContextApi";

const Categories = () => {
  const { allPosts } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div>
      <div className="container mt-4 mb-4" style={{ maxWidth: "1200px" }}>
        <div className="text-center">
          <p className="section-heading">Products</p>
          <div className="heading-bottom-border"></div>
        </div>
        <div className="row">
          {allPosts.length > 0 &&
            allPosts.map((post, i) => {
              return (
                <div className="col-xs-12 col-sm-6 col-md-4 p-4">
                  <div
                    className="card"
                    style={{ border: "none", cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/product/${post.id}`, post);
                    }}
                    data-aos="fade-up"
                    data-aos-offset="-200"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center">
                    <img
                      src={post.url}
                      className="card-img-top border shadow"
                      alt="..."
                      style={{ borderRadius: "4px" }}
                    />
                    <div className="card-body p-1 pt-3">
                      <h6
                        style={{ fontSize: "18px" }}
                        className="card-title text-center">
                        {post.title}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
