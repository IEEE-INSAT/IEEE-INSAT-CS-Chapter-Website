import React, {useEffect} from "react";
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import Footer from "./Home/footer/Footer";
import $ from "jquery";
import "jquery-form";
import Alert from "reactstrap/es/Alert";
import MyNavbar from "./MyNavbar";

function Form({match}) {
    // hook : redirict to news after submitting
    useEffect(() => {
        window.scrollTo(0, 0);
        $('#bootstrapForm').submit(function (event) {
            event.preventDefault();
            var extraData = {};
            $('#bootstrapForm').ajaxSubmit({
                data: extraData,
                dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
                error: function () {
                    // Submit of form should be successful but JSONP callback will fail because Google Forms
                    // does not support it, so this is handled as a failure.
                    // You can also redirect the user to a custom thank-you page:
                    window.location = window.location.origin + "/#/news";
                }
            })
        })
    });
    //this will contain the text;
    var text = () => {
    }
    //this will contain the form
    var displayForm = () => {
        return (
            <Alert color="danger">
                Wrong Path!
            </Alert>
        )
    }
    //this is a bunch of if else for now .. we will find another solution

    if (match.params.event.toLowerCase() === "grandtech") {
        text = () => {
            return (
                <>
                    🛑🛑 IMPORTANT 🛑🛑
                    <br/>
                    🔶IEEE Grand Tech Tunisia is an international event that highlights the newest technologies. It holds workshops and conferences about various computer science domains such as Web Development, Artificial Intelligence, Virtual Reality, etc... 🤩
                    🔶In fact, it is a unique opportunity to forge and improve your ability to present your ideas and be a leader since it offers several soft skills trainings. The sessions are conducted by highly qualified national and international experts. 👨🏻‍🏫😁
                    🔶We're counting on your creativity to apply and prepare a presentation to how you imagine how the general program of this tremendous event should be which you'll be delivering to the CS bureau. The candidate that has the most votes will be the project manager of this year's edition wich will be held on 15th, 16th and 17th of march. The others will have the chance to be part of the committee. 📝🗒️
                    We're awaiting your creations! ❤️
                </>
            )
        }
        displayForm = () => {
            return (
                <form
                    action="https://docs.google.com/forms/d/e/1FAIpQLSfktSe_kpglsQuaKV-xcuyGRlZE2i6TnKtxtuD4ILxAJQIgaA/formResponse"
                    target="_self"
                    id="bootstrapForm"
                    method="POST"
                    className={"contact-form"}
                >
                    <Row>
                        <Col md="6">
                            <label>Name</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-male"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input id="26602322" type="text" name="entry.26602322" placeholder="Name"
                                       required/>
                            </InputGroup>
                        </Col>
                        <Col md="6">
                            <label>Surname</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-male"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input id="1428073836" name="entry.1428073836" placeholder="Surname" type="text"
                                       required/>
                            </InputGroup>
                        </Col>
                    </Row>


                    <label>Email</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-envelope-open-text"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1460092857" name="entry.1460092857" placeholder="Email" type="email"
                               required/>
                    </InputGroup>

                    <label>Phone Number</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-phone"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="463645750" type="text" name="entry.463645750" placeholder="Phone" required/>
                    </InputGroup>

                    <label>Are you IEEE member?</label>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.79616094" value="YES" required/>
                                YES
                            </label>
                        </div>
                    </InputGroup>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.79616094" value="NO" required/>
                                NO
                            </label>
                        </div>
                    </InputGroup>

                    <label>Motivation</label>

                    <InputGroup>
                        <Input type="textarea" id="1474592270" name="entry.1474592270" className="form-control"
                               required/>
                    </InputGroup>

                    <input type="hidden" name="fvv" value="1"/>
                    <input type="hidden" name="fbzx" value="-5678387442332660534"/>

                    <input type="hidden" name="pageHistory" value="0"/>

                    <input style={{marginLeft: "45%"}} className="btn btn-warning" type="submit" value="Submit"/>
                </form>
            );
        }
    }/* else if (match.params.event.toLowerCase() === "ieeextreme") {
        text = () => {
            return (
                <>
                    Greetings people! What is Xtreme?
                    It’s a 24 hour codeing competition.
                    Is that all though? No.
                    You can participate for this event for so many other reason; to improve your coding skills and to be
                    able to familiarize yourself with new programming languages. And of course you’ll be able to pull an
                    all-nighter in INSAT and have a new kind of fun with your friends. There’s also a beautiful sunrise
                    scenery in INSAT, totally story worthy!
                    “but wouldn’t I get bored coding all night?”
                    Of course not, we’ll make sure to provide several animations and activities to make sure that you’ll
                    be having fun every single minute!
                    And don’t worry you won’t sleep anywhere if you get tired, we’ll be providing a resting room.
                    Oh, and there’s free food and coffee!
                    “oh but it’s a week away from the exams!”
                    Yeah, and trust us it’s just a weekend, it won’t take much of your time, think of it as a revision
                    to any subject related to coding!
                    And you’re absolutely welcome to participate, and we’ll be awaiting your presence!

                </>
            )
        }
        displayForm = () => {
            return (
                <form
                    action="https://docs.google.com/forms/d/e/1FAIpQLSfpWOuh79VJ0rLVngav6C4aDgv1pyr_WGbhsTufUTn3NgJv1w/formResponse"
                    target="_self"
                    id="bootstrapForm"
                    method="POST"
                    className={"contact-form"}
                >

                    <label>Team name</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-user-friends"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="532837744" type="text" name="entry.532837744" placeholder="team name"
                               required/>
                    </InputGroup>
                    <br/>
                    <fieldset>
                        <legend htmlFor="171410774">First member (the leader)</legend>
                        <div className="form-group">
                            <p className="help-block">Follow this
                                <a href="https://www.ieee.org/profile/personalprofile/getPersonalProfile.html"
                                   style={{color: "black"}}> link
                                </a> to get your ID :

                            </p>
                        </div>
                    </fieldset>

                    <label>Name</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-male"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="2005620554" type="text" name="entry.2005620554" placeholder="name"
                               required/>
                    </InputGroup>


                    <label>Email</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-envelope-open-text"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1045781291" name="entry.1045781291" placeholder="Email" type="email"
                               required/>
                    </InputGroup>

                    <label>Phone Number</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-phone"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1166974658" type="text" name="entry.1166974658" placeholder="Phone" required/>
                    </InputGroup>


                    <br/>
                    <fieldset>
                        <legend htmlFor="1097930031">Second member</legend>
                    </fieldset>

                    <label>Name</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-male"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="210558396" type="text" name="entry.210558396" placeholder="name"
                        />
                    </InputGroup>


                    <label>Email</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-envelope-open-text"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="533353977" name="entry.533353977" placeholder="Email" type="email"
                        />
                    </InputGroup>

                    <label>Phone Number</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-phone"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1909737074" type="text" name="entry.1909737074" placeholder="Phone"/>
                    </InputGroup>

                    <br/>
                    <fieldset>
                        <legend htmlFor="1264321491">Third member</legend>
                    </fieldset>

                    <label>Name</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-male"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1111441241" type="text" name="entry.1111441241" placeholder="name"
                        />
                    </InputGroup>


                    <label>Email</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-envelope-open-text"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="36803416" name="entry.36803416" placeholder="Email" type="email"
                        />
                    </InputGroup>

                    <label>Phone Number</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-phone"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1124108590" type="text" name="entry.1124108590" placeholder="Phone"/>
                    </InputGroup>


                    <label>Comments</label>

                    <InputGroup>
                        <Input type="textarea" id="839337160" name="entry.839337160" className="form-control"
                        />
                    </InputGroup>

                    <input type="hidden" name="fvv" value="1"/>
                    <input type="hidden" name="fbzx" value="-8214401713655552996"/>

                    <input type="hidden" name="pageHistory" value="0"/>

                    <input style={{marginLeft: "45%"}} className="btn btn-warning" type="submit" value="Submit"/>
                </form>
            );
        }
    } else if (match.params.event.toLowerCase() === "bioit") {
        text = () => {
            return (
                <>
                    Here we go again, IEEE EMBS INSAT SB in collaboration with IEEE CS INSAT SB organizes the
                    well-known annual challenge. 🤩
                    <br/>
                    BIOIT « BIOlogy and Information Technology » is a grand contest where it aims to combine and develop
                    over aching domains that complement each other: Biology, medicine, Agriculture and agronomy on one
                    hand and IT on the other hand. It simply searches to digitalize the different areas of biology and
                    medicine. 💉🔬
                    <br/>
                    Therefore, BIOIT is a golden opportunity for ambitious and dedicated students who seek to turn their
                    fascinating ideas into real life projects, it is destined to youth who are skillful in programming
                    and especially those who are talented in Biology or Development. 👨🏻‍💻👩🏽‍💻
                    <br/>
                    So it's your opportunity to show us your potential and be part of the team.🔥
                    Hurry up and fill the form to make it a successful event.🤩
                </>
            )
        }
        displayForm = () => {
            return (
                <form
                    action="https://docs.google.com/forms/d/e/1FAIpQLSf9JCMNEjPPTsaheJ2yYbomDQVyvoLJk-q0lFYt-RwOKfsoaQ/formResponse"
                    target="_self"
                    id="bootstrapForm"
                    method="POST"
                    className={"contact-form"}
                >
                    <Row>
                        <Col md="6">
                            <label>Name</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-male"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input id="1605292483" type="text" name="entry.1605292483" placeholder="Name"
                                       required/>
                            </InputGroup>
                        </Col>
                        <Col md="6">
                            <label>Surname</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-male"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input id="1769860584" name="entry.1769860584" placeholder="Surname" type="text"
                                       required/>
                            </InputGroup>
                        </Col>
                    </Row>


                    <label>Email</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-envelope-open-text"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="7493109" name="entry.7493109" placeholder="Email" type="email"
                               required/>
                    </InputGroup>

                    <label>Facebook Link</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fab fa-facebook-f"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="270863310" type="text" name="entry.270863310" placeholder="Facebook" required/>
                    </InputGroup>

                    <label>Phone Number</label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-phone"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="1843470981" type="text" name="entry.1843470981" placeholder="Phone" required/>
                    </InputGroup>

                    <label>Post</label>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.1994019761" value="Project manager" required/>
                                Project manager
                            </label>
                        </div>
                    </InputGroup>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.1994019761" value="Sponsoring manager" required/>
                                Sponsoring manager
                            </label>
                        </div>
                    </InputGroup>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.1994019761" value="Contact/communication manager"
                                       required/>
                                Contact/communication manager
                            </label>
                        </div>
                    </InputGroup>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.1994019761" value="Logistics manager" required/>
                                Logistics manager
                            </label>
                        </div>
                    </InputGroup>
                    <InputGroup>
                        <div className="radio">
                            <label>
                                <Input type="radio" name="entry.1994019761" value="Media manager" required/>
                                Media manager
                            </label>
                        </div>
                    </InputGroup>

                    <label>Motivation</label>

                    <InputGroup>
                        <Input type="textarea" id="824541366" name="entry.824541366" className="form-control"
                               required/>
                    </InputGroup>

                    <input type="hidden" name="fvv" value="1"/>
                    <input type="hidden" name="fbzx" value="782785377183323169"/>

                    <input type="hidden" name="pageHistory" value="0"/>

                    <input style={{marginLeft: "45%"}} className="btn btn-warning" type="submit" value="Submit"/>
                </form>
            );
        }
    }*/


    return (
        <>
            <div style={{
                position:"fixed",
                width:'100%',
                zIndex:9999
            }}>
                <MyNavbar fixed={true}/>
            </div>
            <div
                className="page-header section-dark"
                style={{
                    height: "50vh",
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: "center",
                }}
            >
                <div className="content-center">
                    <Container>
                        <div className="title-brand text-center">

                            <h1 style={{fontFamily: "railway"}} className="presentation-title display-3">
                                {match.params.event} </h1>

                        </div>
                    </Container>
                </div>


            </div>

            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="12">
                        <p className="text-center" style={
                            {
                                marginTop: "5%", color: "#191919",
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: "16px"
                            }}>
                            {text()}
                        </p>

                        {displayForm()}
                    </Col>
                </Row>
            </Container>
            <br/><br/>
            <Footer/>
        </>

    )
}


export default Form;
