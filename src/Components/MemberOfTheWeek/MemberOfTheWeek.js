import React, { useEffect } from "react";
import classes from "./MemberOfTheWeek.module.css";
import MyNavbar from "../MyNavbar";
import Footer from "../Home/footer/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import $ from "jquery";
import Typed from "typed.js/src/typed";
import PreviousMemberWeek from "./PreviousMemberWeek";

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

  const prevMembers = membersOfTheWeek.slice(1);

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
            <div className="row d-flex justify-content-center">
              <div className="col-md-4 " data-aos="fade-right">
                <img
                  src={membersOfTheWeek[0].image}
                  className="img-fluid"
                  alt="Current Member of the week"
                />
              </div>

              <div className="col-md-7">
                <div data-aos="fade-in">
                  <h1 style={{ color: "#ff6535" }}>
                    {membersOfTheWeek[0].fullName}
                  </h1>
                  <p style={{ color: "#29588c" }}>
                    {membersOfTheWeek[0].gender === "male" ? "He" : "She"}{" "}
                    Is&nbsp;
                    <span
                      style={{ color: "#29588c" }}
                      className="typed"
                      data-typed-items={`, ${membersOfTheWeek[0].characteristics.join(
                        ", "
                      )}`}
                    >
                      {" "}
                    </span>
                  </p>
                </div>
                <p data-aos="fade-up">{membersOfTheWeek[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {membersOfTheWeek.length > 1 && (
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
