import React, { useEffect } from "react";
import classes from "./MemberOfTheWeek.module.css";
import MyNavbar from "../MyNavbar";
import Footer from "../Home/footer/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import $ from "jquery";
import Typed from "typed.js/src/typed";
import PreviousMemberWeek from "./PreviousMemberWeek";
import Activity from "../Activities/Activity";
import { activities } from "../Activities/fake";
import { events } from "../MemberOfTheWeek/fake";
const baseUrl =
  "../../assets/img/Member_of_the_week/members/membersOfTheEvents/";

const MemberOfTheWeek = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      disable: "mobile",
      once: true,
      mirror: false,
    });
    window.scrollTo(0, 0);
    if ($(".typed").length) {
      let typed_strings = $(".typed").data("typed-items");
      typed_strings = typed_strings.split(",");
      new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 150,
        backSpeed: 50,
        backDelay: 2000,
      });
    }
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
      <header className={classes.header}>
        <div className={classes.container}>
          <div className="section-header">
            <h3>
              <span className="our-title">Our Best </span>{" "}
              <span className="activities-title">Members</span>
            </h3>
          </div>
        </div>
      </header>
      <div className={classes.container}>
        {events.map((activity, index) => (
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
              baseURL={baseUrl}
            />
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default MemberOfTheWeek;
