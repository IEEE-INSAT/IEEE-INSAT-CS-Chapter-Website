import React, { useEffect } from "react";
import MyNavbar from "../MyNavbar";
import Activity from "./Activity";
import Footer from "../Home/footer/Footer";
import "./activity.css";
import { activities } from "./fake";
function Activities() {
  const allActivities = activities;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          zIndex: 9999,
        }}
      >
        <MyNavbar fixed={false} />
      </div>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/activity/activityBg.webp") + ")",
          height: "60vh",
          width: `100%`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <section id="activities" className="wow fadeIn">
        <div className="container">
          <header className="section-header">
            <h3>
              <span className="our-title">Our</span>{" "}
              <span className="activities-title">Activities</span>
            </h3>
          </header>
          <div className="content">
            {allActivities.map((activity, index) => (
              <div key={index}>
                <Activity
                  id={activity.id}
                  title={activity.title}
                  date={activity.date}
                  place={activity.place}
                  description={activity.description}
                  details={activity.details}
                  images={activity.images}
                  facebookUrl={activity.facebookUrl}
                  instagramUrl={activity.instagramUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Activities;
