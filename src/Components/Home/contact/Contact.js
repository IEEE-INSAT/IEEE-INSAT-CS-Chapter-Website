import React, { useEffect, useState } from "react";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
import emailjs from "emailjs-com";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "msg":
        setMessage(e.target.value);
        break;
      case "subject":
        setSubject(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  };

  useEffect(() => {
    if (subject === "" || name === "" || email === "" || message === "") {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [email, name, message, subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disableButton) {
      toast.success("Message Sent ! thank you for your feedback 😃", {
        autoClose: "3000",
        position: "bottom-right",
      });
      emailjs
        .sendForm(
          "gmail",
          "template_z4lfgwt",
          e.target,
          "user_jsnZ9M48Nkwoo5QPXbdN9"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

      e.target.reset();
    } else {
      toast.error("Message not sent 😢! Please provide all the information", {
        autoClose: "3000",
        position: "bottom-right",
      });
    }
  };

  return (
    <section id="contact" className="section-bg wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h3>
            <span className="contact-title">Contact</span>{" "}
            <span className="us-title">Us</span>
          </h3>
        </div>

        <div className="row contact-info">
          <div className="col-md-4">
            <div className="contact-address">
              <i className="fas fa-map-marker-alt" />
              <h3>Address</h3>
              <address>
                676 INSAT Centre Urbain Nord BP، Tunis Cedex 1080{" "}
              </address>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-phone">
              <i className="fas fa-phone" />
              <h3>Phone Number</h3>
              <p>+216 92 729 167</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-email">
              <i className="fas fa-envelope" />
              <h3>Email</h3>
              <p>ieeeinsatsb.cs@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="form">
          <div id="sendmessage">Your message has been sent. Thank you!</div>
          <div id="errormessage" />
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label hidden={true} name="name" for="name">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  className="form-control"
                  id="name"
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  data-rule="minlen:4"
                  minLength={4}
                  maxLength={20}
                  data-msg="Please enter at least 4 chars"
                />
                <div className="validation" />
              </div>
              <div className="form-group col-md-6">
                <label hidden={true} for="email" name="email">
                  Name
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  data-rule="email"
                  data-msg="Please enter a valid email"
                />
                <div className="validation" />
              </div>
            </div>
            <div className="form-group">
              <label hidden={true} for="subject" name="subject">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                onChange={handleInputChange}
                placeholder="Subject"
                data-rule="minlen:4"
                minLength={4}
                data-msg="Please enter at least 8 chars of subject"
              />
              <div className="validation" />
            </div>
            <div className="form-group">
              <label hidden={true} name="message" for="msg">
                Name
              </label>
              <textarea
                id="msg"
                className="form-control"
                name="message"
                rows="5"
                data-rule="required"
                onChange={handleInputChange}
                data-msg="Please write something for us"
                placeholder="Tell us your thoughts and feelings..."
              />
              <div className="validation" />
            </div>
            <div className="text-center">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
}

export default Contact;
