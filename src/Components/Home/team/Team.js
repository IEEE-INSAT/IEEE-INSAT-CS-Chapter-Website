import React, {Component} from "react";
import './team.css';
import Aos from "aos";
import 'aos/dist/aos.css';
import '../../../assets/css/flat-icon/flaticon.css';
export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalName: "",
            modalText: "",
            showModal: false,
        }
        Aos.init(
            {
                duration:2000,
                disable: 'mobile',
                once: true,
                mirror: false
            }
        )

    }

    handleModal = (name, text) => {
        this.setState({modalName: name, modalText: text, showModal: true});
    }

    render() {
        const modals = [
            {
                id:1,
                name:"Souha Ben Hassine",
                role:"ChairWoman",
                img:"souha.webp",
                desc: `Souha is a software engineering student with a great passion for computer science. She thrives on
                 challenges and constantly sets goals for herself. She’s a natural leader who’s always looking for an 
                 opportunity to achieve greatness and bring out the best in people.`,
                linkedinLink:"https://www.linkedin.com/in/souha-ben-hassine-58a3a017b/",
                facebookLink:"https://www.facebook.com/souha.benhassine.77",

            },
            {
                id:8,
                name:"Bochra Feki",
                role:"Human Resources Manager",
                img:"bochra.webp",
                desc: `Bochra is a talented and energetic software engineering student. She’s a people-person who loves 
                meeting new people and learning about their lives and their backgrounds. She’s an excellent communicator
                 who will make you feel comfortable and welcomed.`,
                linkedinLink:"https://www.linkedin.com/in/bochra-feki-6168a21ab/",
                facebookLink:"https://www.facebook.com/bochrabachrouch.feki",
            },
            {
                id:7,
                name:"Eya Abid",
                role:"Vice Chair Woman",
                img:"eya.webp",
                desc:`Eya is an IT computer systems & networks engineering student, passionate about data science and web
                 design, this is why she spends a lot of her time learning in online classes so that she can amplify her
                  skills. She is in love with greenery and nature photography.`,
                linkedinLink:"https://www.linkedin.com/in/eya-abid/",
                facebookLink:"https://www.facebook.com/eya.abid.99",
            },
            {
                id:3,
                name:"Bacem Ben Daly",
                role:"General Secretary",
                img:"bacem.webp",
                desc:`Bacem is an ambitious software engineering student passionate about web development, sports, and
                 photography. His determination and time-management made him the best fit for being the general secretary
                  of this year.`,
                linkedinLink:"https://www.linkedin.com/in/bacembendaly/",
                facebookLink:"https://www.facebook.com/bacem.bendaly.3",
            },
            {
                id:4,
                name:"Ahmed Grati",
                role:"Webmaster",
                img:"ahmed.webp",
                desc: `Ahmed is a talented and cooperative software engineering student with a great passion for web, game,
                 and mobile development. He’s a hard worker, an effective teacher, a technical expert, and a skilled developer.`,
                linkedinLink:"https://www.linkedin.com/in/ahmed-grati-a0a2a0183/",
                facebookLink:"https://www.facebook.com/ahmed.grati.739/",
            },
            {
                id:5,
                name:"Oussema Ghorbel",
                role:"Training Manager",
                img:"oussema.webp",
                desc: `Oussema is a Networking and Telecommunications student aiming to become an expert in Network
                 architecture and security. He is a certified Network administrator and Cloud architect, and is starting 
                 to dip his toes into IT security.`,
                linkedinLink:"https://www.linkedin.com/in/oussema-ghorbel/",
                facebookLink:"https://www.facebook.com/oussema.ghorbel.186",
            },
            {
                id:6,
                name:"Ramez Ben Aribia",
                role:"Sponsoring Manager",
                img:"ramez.webp",
                desc: `Ramez is an energetic and resourceful software engineering student who knows exactly how to deal 
                with money! He is constantly checking in to determine how close or how far away we are
                 and what it will take to make it happen.`,
                linkedinLink:"https://www.linkedin.com/in/ramez-ben-71243b193/",
                facebookLink:"https://www.facebook.com/ramez.benaribia.54",
            },
            {
                id:2,
                name:"Chédly Ben Azizi",
                role:"Media Manager",
                img:"chedli.webp",
                desc: `Chedly is a skillful and artsy IT computer systems & networks engineering student with large knowledge
                 and understanding of the field of computer science. He’s a funny spirit and a creative mind who always
                  seeks originality and perfection.`,
                linkedinLink:"https://www.linkedin.com/in/chedly-ben-azizi-25498418a/",
                facebookLink:"https://www.facebook.com/chedly.b.azizi",
            },
        ];

        return (
            <section id="team">
                <div className="container">
                    <div className="section-header wow fadeInUp">
                        <h3><span style={{color:"#ff6535"}}>Our</span> <span style={{color:"#29558c"}}>Team</span></h3>
                        <p className="team-section-description">Meet our exceptionally talented team of digital natives.</p>
                    </div>
                    <div className="page-section">
                        <div className="justify-content-center row gutters-80">
                            {modals.map(modal => (
                                <div className="member-card col-md-4"  key={modal.id} data-aos="fade-up">
                                    <div className="thumbnail team__single">
                                        <div className="bio text-center">
                                            <img src={require('../../../assets/img/team/'+modal.img)} alt=""/>
                                            <h2>{modal.name}</h2>
                                            <p className="role-name">{modal.role}</p>
                                        </div>
                                        <div className="caption">
                                            <p>{modal.desc}</p>
                                            <div className="social-icons">
                                                <ul>
                                                    <li>
                                                        <a aria-label="ieee cs computer society insat Facebook" href={modal.facebookLink}>
                                                            <i className="flaticon-facebook-letter-logo"/>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a aria-label="ieee cs computer society insat linkedin" href={modal.linkedinLink}>
                                                            <i className="flaticon-linkedin-logo"/>
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

