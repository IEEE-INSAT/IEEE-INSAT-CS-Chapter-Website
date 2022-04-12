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
        name: "Asma Jebari",
        role: "ChairWoman",
        img: "asma.jpg",
        desc: `Asma is a IT computer systems & networks engineering student with a great passion for computer science. She thrives on
                 challenges and constantly sets goals for herself. She’s a natural leader who’s always looking for an 
                 opportunity to achieve greatness and bring out the best in people.`,
        linkedinLink: "https://www.linkedin.com/in/asmajebari/",
        facebookLink: "https://www.facebook.com/asma.jebari4",
      },
      {
        id: 8,
        name: "Anissa Ben Hamza",
        role: "Human Resources Manager",
        img: "anissa.jpg",
        desc: `Anissa is a talented and energetic IT computer systems & networks engineering student. She’s a people-person who loves
                  meeting new people and learning about their lives and their backgrounds. She’s an excellent communicator
                   who will make you feel comfortable and welcomed.`,
        linkedinLink: "https://www.linkedin.com/in/anissa-ben-hamza-7627621bb/",
        facebookLink: "https://www.facebook.com/profile.php?id=100009580279029",
      },
      {
        id: 7,
        name: "Salma Borchani",
        role: "Vice Chair Woman",
        img: "salma.jpg",
        desc: `Salma is a Software engineering student, passionate about web
                   development, this is why she spends a lot of her time learning in online classes so that she can amplify her
                    skills. She is so sweet and fun.`,
        linkedinLink: "https://www.linkedin.com/in/salma-borcheni/",
        facebookLink: "https://www.facebook.com/salma.borchani.5",
      },
      {
        id: 3,
        name: "Issam Jebnouni",
        role: "General Secretary",
        img: "issam.jpg",
        desc: `Issam is an ambitious IT computer systems & networks student passionate about a lot of things. His determination and time-management made him the best fit for being the general secretary
                    of this year.`,
        linkedinLink: "https://www.linkedin.com/in/issam-jebnouni-345211206/",
        facebookLink: "https://www.facebook.com/issam.jebnouni",
      },
      {
        id: 4,
        name: "Mohamed Sahnoun",
        role: "Webmaster",
        img: "sahnoun.jpg",
        desc: `Mohamed is a talented and cooperative software engineering student with a great passion for web development, data science and Artificial Intelligence
                   . He’s a hard worker, an effective teacher, a technical expert, and a skilled developer.`,
        linkedinLink: "https://www.linkedin.com/in/mohamed-sahnoun-1a33b71a0/",
        facebookLink: "https://www.facebook.com/mohamed.sahnoun.545",
      },
      {
        id: 5,
        name: "Mahdi Chaari",
        role: "Training Manager",
        img: "mahdi.jpg",
        desc: `Mahdi is a Software Engineering student. He is a hard worker driven by passion and a desire to change things. He is a source of creativity and energy to the group`,
        linkedinLink: "https://www.linkedin.com/in/mahdi-chaari-5195421b9/",
        facebookLink: "www.facebook.com/mahdi.chaari.75",
      },
      {
        id: 6,
        name: "Khaldoun Taktak",
        role: "Sponsoring Manager",
        img: "khaldoun.jpg",
        desc: `Khaldoun is an energetic and resourceful IT and Networking student who knows exactly how to deal
                  with money! He is constantly checking in to determine how close or how far away we are
                   and what it will take to make it happen.`,
        linkedinLink: "https://www.linkedin.com/in/khaldoun-taktak-48b15922/",
        facebookLink: "https://www.facebook.com/Khaldountaktak0",
      },
      {
        id: 2,
        name: "Rasslen Ansi",
        role: "Media Manager",
        img: "rasslen.jpg",
        desc: `Rasslen is a skillful and artsy Software engineering student with large knowledge
                   and understanding of the field of computer science. He’s a funny spirit and a creative mind who always
                    seeks originality and perfection.`,
        linkedinLink: "#",
        facebookLink: "https://www.facebook.com/raslen.ansi",
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
                      <p>{modal.desc}</p>
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
