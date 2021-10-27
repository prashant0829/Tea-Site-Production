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
                  <div className="card" style={{ border: "none" }}>
                    <img
                      src={post.url}
                      className="card-img-top"
                      alt="..."
                      style={{ borderRadius: "4px" }}
                    />
                    <div className="card-body p-1 pt-2">
                      <h5 className="card-title ">{post.title}</h5>
                      <p className="card-text" style={{ textAlign: "justify" }}>
                        {`${post.desc}`.substring(0, 150) + " "}{" "}
                        <span
                          style={{ color: "#4285F4", cursor: "pointer" }}
                          onClick={() => {
                            history.push(`/product/${post.id}`, post);
                          }}>
                          read more...
                        </span>
                      </p>
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
