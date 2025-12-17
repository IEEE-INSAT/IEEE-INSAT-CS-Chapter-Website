import React, { useEffect } from "react";
import classes from "./MemberOfTheWeek.module.css";
import MyNavbar from "../MyNavbar";
import Footer from "../Home/footer/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import $ from "jquery";
import Typed from "typed.js/src/typed";
import PreviousMemberWeek from "./PreviousMemberWeek";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

  const membersOfTheWeek = [
    {
      id: 12,
      fullName: "Ines Mtibaa",
      gender: "female",
      image: require("../../assets/img/Member_of_the_week/members/ines-mtibaa.png"),
      characteristics: [" Motivated", "Committed"],
      description: `Ines is a member of the media team, participated in CSTAM 2.0 and is now a part of the projects department. She is a great addition to our community, a very hard-working and genuinely friendly person.`,
    },
    {
      id: 11,
      fullName: "Moetaz Zwari",
      gender: "male",
      image: require("../../assets/img/Member_of_the_week/members/moetez-zwari.png"),
      characteristics: [" Helpful", "Trustworthy", "Highly organized"],
      description: `Moetaz was our IEEEXtreme 19.0 Logistics Manager showing exceptional organization skills, thanks to him the event went smoothly. He helped, as well, in our Discord & Game nights, making him the discovery of the season. And btw he uses Arch!`,
    },
    {
      id: 10,
      fullName: "Ghayth Abidli",
      gender: "male",
      image: require("../../assets/img/Member_of_the_week/members/ghayth-abidi.png"),
      characteristics: [" Reliable", "Enthousiastic"],
      description: `So far, Ghayth is one of our best members this year not only in our CS Chapter but for the whole IEEE INSAT SB Community. Despite being a first year student, he was very involved and most importantly friendly and reliable.`,
    },
    {
      id: 9,
      fullName: "Mahdi Chaari",
      gender: "male",
      image: require("../../assets/img/Member_of_the_week/members/mahdi.webp"),
      characteristics: [" Brilliant", "Passionate", "reliable"],
      description: `Mahdi is an MPI student and he's our newest discovered pearl in the CS family. 
      Not only because he's one of the most creative and active members, but also because of his dedication and hard working ability.He showcased his talent during the HOC event where he demonstrated his capabilities to deal with young children and manage his team. We are extremely proud of you Mahdi!
      `,
    },
    {
      id: 8,
      fullName: "Syrine Doukali",
      gender: "female",
      image: require("../../assets/img/Member_of_the_week/members/sirine.webp"),
      characteristics: [" Trustworthy", "elegant", "diligent"],
      description: `Syrine is an RT 2 student and she's one of the smartest members in the CS family. 
      She is extremely friendly, and she's willing to go all the way to achieve the wanted task.
      That shows her dedication and her tactics dealing with difficult situations. All of this was demonstrated during her HOC tutoring session where she proved herself in dealing with all different problems.You have a huge potential Syrine not only in the CS chapter, but in all the aspects of your life! 
      `,
    },
    {
      id: 7,
      fullName: "Sana Jebali",
      gender: "female",
      image: require("../../assets/img/Member_of_the_week/members/sana.webp"),
      characteristics: [" Enthousiastic", "compasssionate", "inventive"],
      description: `Sana is a hard-working chemical engineering student and a devoted member of the IEEE CS Chapter.
            She’s a ray of sunshine who never fails to put a smile on people’s faces with her funny memes and joyful spirit.
            As the IEEEXtreme 14.0 Human Resources manager, Sana achieved the highest number of members participating in this
            competition in Tunisia! She showcased incredible passion and professionalism throughout her work and helped our
            members express themselves and get out of their comfort zone. She’s a much-valued member of our family and we can’t
            wait to see her creativity shine through this year!`,
    },
    {
      id: 6,
      fullName: "Haroun Abbesi",
      gender: "male",
      image: require("../../assets/img/Member_of_the_week/members/haroun.webp"),
      characteristics: [" talented", "professional", "motivated"],
      description: `Haroun is an extremely talented industrial computing and automation engineering student and an active member of the IEEE CS Chapter.
                He’s passionate about his work and naturally committed to quality and positive outcomes. He loves what he does, and has a steady source of motivation that drives him to do his best always. As the IEEEXtreme 14.0’s media manager, he showcased incredible creativity, engagement, and professionalism and his passion led him to challenge himself daily and learn new skills that helped him achieve greatness.
                He is, without any doubt, the go-to person for any design needs.`,
    },
    {
      id: 1,
      fullName: "Ahmed Ayari",
      gender: "male",
      image: require("../../assets/img/Member_of_the_week/members/ahmed.webp"),
      characteristics: [" enthusiastic", "hard working", "intelligent"],
      description: `Ahmed is an ambitious software-engineering student and an active member of the IEEE CS Chapter. He
             is a hard-working and he is a devoted member who helped develop this website. His enthusiasm to learn is very inspiring,
              he has excelled in every project he has been assigned to and he carries out his responsibilities well and
               promptly. His smile and positive energy never fail to bring joy into a room and his technical skills and 
               creative mind never fail to inspire. `,
    },
    {
      id: 2,
      fullName: "Amine Haj Ali",
      gender: "male",
      image: require("../../assets/img/Member_of_the_week/members/amine.webp"),
      characteristics: [" highly organized", "committed", "hot energetic"],
      description: `Amine is ambitious and smart, he fascinated us with his bright ideas and his help in organizing many events.`,
    },
    {
      id: 3,
      fullName: "Molka Rais",
      gender: "female",
      image: require("../../assets/img/Member_of_the_week/members/molka.webp"),
      characteristics: [" disciplined", "positive", "supportive"],
      description: `Molka is one of our bravest members so far, she is the mastermind of decoration and painting!`,
    },
  ];

  const currentMembers = membersOfTheWeek.slice(0, 3);
  const prevMembers = membersOfTheWeek.slice(3);

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
              <span className="our-title">Our Member</span>{" "}
              <span className="activities-title">of The month</span>
            </h3>
          </div>

          <div className={classes.currentMember}>
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={5000}
              transitionTime={800}
              showThumbs={false}
              showStatus={false}
            >
              {currentMembers.map((member) => (
                <div key={member.id}>
                  <div
                    className="row d-flex justify-content-center"
                    style={{ paddingBottom: "40px" }}
                  >
                    <div className="col-md-4">
                      <img
                        src={member.image}
                        className="img-fluid"
                        alt={`Member ${member.fullName}`}
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="col-md-7" style={{ textAlign: "left" }}>
                      <div>
                        <h1 style={{ color: "#ff6535" }}>{member.fullName}</h1>
                        <p style={{ color: "#29588c", fontSize: "1.2rem" }}>
                          {member.gender === "male" ? "He" : "She"} is{" "}
                          {member.characteristics.map((char, i) => (
                            <span key={i}>
                              {i > 0 && ", "}
                              <strong>{char}</strong>
                            </span>
                          ))}
                        </p>
                      </div>
                      <p style={{ fontSize: "1rem", color: "#333" }}>
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </header>

      {prevMembers.length > 0 && (
        <section className={classes.section}>
          <div className={classes.container}>
            <div className="section-header">
              <h3>
                <span className="our-title">Our Previous</span>{" "}
                <span className="activities-title">Members of The month</span>
              </h3>
            </div>

            <div className={classes.prevContent}>
              {prevMembers.map((memberInfo, index) => {
                if (index % 2)
                  return (
                    <div key={index} data-aos="fade-left">
                      <PreviousMemberWeek {...memberInfo} left />
                    </div>
                  );
                else
                  return (
                    <div key={index} data-aos="fade-right">
                      <PreviousMemberWeek {...memberInfo} />
                    </div>
                  );
              })}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default MemberOfTheWeek;
