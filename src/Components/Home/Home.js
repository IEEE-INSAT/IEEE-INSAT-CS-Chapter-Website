import Header from "./header/Header";
import React, { useEffect } from "react";
import AboutSection from "./about/AboutSection";
import Team from "./team/Team";
import Footer from "./footer/Footer";
import "../../assets/css/Home.css";
import MyNavbar from "../MyNavbar";
import Sponsors from "./sponsors/sponsors";

import Facts from "./facts/Facts";
import Contact from "./contact/Contact";

function Home() {
  /*useEffect(()=>{
            window.scrollTo(0, 0);
    });*/
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
      <Header height={100} imgPath={"home.webp"} />
      <AboutSection />
      <Facts />
      <Team />
      <Sponsors show={true} />{" "}
      {/*Toggle the render of Sponsors component with show property */}
      <Contact id="contact" />
      <Footer />
    </>
  );
}

export default Home;
