import React, { useContext } from "react";
import { useRef } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/ContextApi";

const Contact = () => {
  const form = useRef();
  const { companyDetails } = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const success = () => {
    enqueueSnackbar("Message sent successfully", {
      variant: "success",
    });
  };
  const failure = () => {
    enqueueSnackbar("Opps! Some error occured while sending the mail.", {
      variant: "error",
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          // console.log(result.text);
          success();
        },
        (error) => {
          // console.log(error.text);
          failure();
        }
      );
  };
  return (
    <div>
      <div className="container-contact">
        <div className="innerwrap">
          <section className="section1 clearfix">
            <div className="textcenter">
              <div className="text-center">
                <p className="section-heading">Contact Us</p>
                <div className="heading-bottom-border"></div>
              </div>
              <h4>Drop Us a Mail</h4>
            </div>
          </section>

          <section className="section2 clearfix">
            <div className="col2 column1 first">
              <div className="sec2innercont">
                <div className="sec2addr">
                  <p>
                    <span className="collig">Address :</span>
                    {companyDetails.address}
                  </p>
                  <p>
                    <span className="collig">Phone :</span>{" "}
                    {companyDetails.contactNumber}
                  </p>
                  <p>
                    <span className="collig">Email :</span>{" "}
                    {companyDetails.email}
                  </p>
                  {companyDetails.contactNumber2 && (
                    <p>
                      <span className="collig">Landline :</span>{" "}
                      {companyDetails.contactNumber2}
                    </p>
                  )}
                </div>
              </div>
              <div
                className="sec2map"
                style={{
                  overflow: "hidden",
                  width: "100%",
                  minHeight: "300px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url("/images/contact.jpg")`,
                }}></div>
            </div>
            <div className="col2 column2 last">
              <div className="sec2contactform">
                <h3 className="sec2frmtitle">
                  Want to Know More?? Drop Us a Mail
                </h3>
                <form action="" ref={form} onSubmit={sendEmail}>
                  <div className="clearfix">
                    <input
                      type="text"
                      className="col2 first"
                      type="text"
                      placeholder="FirstName"
                      name="firstname"
                    />
                    <input
                      type="text"
                      className="col2 last"
                      type="text"
                      placeholder="LastName"
                      name="lastname"
                    />
                  </div>
                  <div className="clearfix">
                    <input
                      type="email"
                      className="col2 first"
                      type="Email"
                      placeholder="Email"
                      name="email"
                    />
                    <input
                      type="tel"
                      className="col2 last"
                      type="text"
                      placeholder="Contact Number"
                      name="phone"
                    />
                  </div>
                  <div className="clearfix">
                    <textarea
                      name="message"
                      id=""
                      cols="30"
                      rows="7"
                      placeholder="Your Message Here"
                    />
                  </div>
                  <div className="clearfix">
                    <input type="submit" value="Send" />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
