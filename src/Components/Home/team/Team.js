import React, { Component } from "react";
import "./team.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../../assets/css/flat-icon/flaticon.css";
export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalName: "",
      modalText: "",
      showModal: false,
    };
    Aos.init({
      duration: 2000,
      disable: "mobile",
      once: true,
      mirror: false,
    });
  }

  handleModal = (name, text) => {
    this.setState({ modalName: name, modalText: text, showModal: true });
  };

  render() {
    const modals = [
      {
        id: 1,
        name: "Hani Haddad",
        role: "ChairMan",
        img: "hani.jpg",
        // desc: `Asma is a IT computer systems & networks engineering student with a great passion for computer science. She thrives on
        //          challenges and constantly sets goals for herself. She’s a natural leader who’s always looking for an 
        //          opportunity to achieve greatness and bring out the best in people.`,
        linkedinLink: "https://www.linkedin.com/in/hani-haddad1/",
        facebookLink: "https://www.facebook.com/julio.hannouna.bogoss/",
      },
      {
        id: 8,
        name: "Eya Ridene",
        role: "Vice chair membership",
        img: "eyar.jpg",
        // desc: `Anissa is a talented and energetic IT computer systems & networks engineering student. She’s a people-person who loves
        //           meeting new people and learning about their lives and their backgrounds. She’s an excellent communicator
        //            who will make you feel comfortable and welcomed.`,
        linkedinLink: "https://www.linkedin.com/in/eya-ridene-b73b86232/",
        facebookLink: "https://www.facebook.com/eya.riden.1",
      },
      {
        id: 7,
        name: "Naim Dali ",
        role: "Vice Chair technical",
        img: "naim.jpg",
        // desc: `Salma is a Software engineering student, passionate about web
        //            development, this is why she spends a lot of her time learning in online classes so that she can amplify her
        //             skills. She is so sweet and fun.`,
        linkedinLink: "https://www.linkedin.com/in/naim-dali-b1ab831a8/",
        facebookLink: "https://www.facebook.com/naim.dali.54",
      },
      {
        id: 3,
        name: "Eya Teyeb",
        role: "General Secretary",
        img: "eyat.jpg",
        // desc: `Issam is an ambitious IT computer systems & networks student passionate about a lot of things. His determination and time-management made him the best fit for being the general secretary
        //             of this year.`,
        linkedinLink: "https://www.linkedin.com/in/eya-teyeb-0408371b7/",
        facebookLink: "https://www.facebook.com/eyateyeb7",
      },
     
      {
        id: 2,
        name: "Sofiene azzabi",
        role: "Media Manager",
        img: "hani.jpg",
        // desc: `Rasslen is a skillful and artsy Software engineering student with large knowledge
        //            and understanding of the field of computer science. He’s a funny spirit and a creative mind who always
        //             seeks originality and perfection.`,
        linkedinLink: "#",
        facebookLink: "https://www.facebook.com/sofienne.azzabi",
      },
    ];

    return (
      <section id="team">
        <div className="container">
          <div className="section-header wow fadeInUp">
            <h3>
              <span style={{ color: "#ff6535" }}>Our</span>{" "}
              <span style={{ color: "#29558c" }}>Team</span>
            </h3>
            <p className="team-section-description">
              Meet our exceptionally talented team of digital natives.
            </p>
          </div>
          <div className="page-section">
            <div className="justify-content-center row gutters-80">
              {modals.map((modal) => (
                <div
                  className="member-card col-md-4"
                  key={modal.id}
                  data-aos="fade-up"
                >
                  <div className="thumbnail team__single">
                    <div className="bio text-center">
                      <img
                        src={require("../../../assets/img/team/" + modal.img)}
                        alt=""
                      />
                      <h2>{modal.name}</h2>
                      <p className="role-name">{modal.role}</p>
                    </div>
                    <div className="caption">
                      {/* <p>{modal.desc}</p> */}
                      <div className="social-icons">
                        <ul>
                          <li>
                            <a
                              aria-label="ieee cs computer society insat Facebook"
                              href={modal.facebookLink}
                            >
                              <i className="flaticon-facebook-letter-logo" />
                            </a>
                          </li>
                          <li>
                            <a
                              aria-label="ieee cs computer society insat linkedin"
                              href={modal.linkedinLink}
                            >
                              <i className="flaticon-linkedin-logo" />
                            </a>
                          </li>
                        </ul>
                        {/*<li><a href="#"><i className="flaticon-google-plus"></i></a></li>*/}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
