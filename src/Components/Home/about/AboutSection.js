import React, {useEffect, useState} from "react";
import './about.css';
import '../../../../node_modules/ionicons';
import Aos from "aos";
import 'aos/dist/aos.css';

function AboutSection() {

    useEffect(() => {
        Aos.init({
            duration:1000,
            disable: 'mobile',
            once: true,
            mirror: false
        });
    } , [])
        return (
            <section id="about">
                <div className="container">

                    <header className="section-header">
                        <h3><span className="about-title">About</span> <span className="us-title">Us</span></h3>
                        <p>The IEEE INSAT Computer Society Chapter is the premier
                            source of information, inspiration, and collaboration in INSAT’s computer
                            science community. Connecting them to multiple resources and professionals in
                            the field. <br/>
                            The CS Chapter helps boost the skills of developers and future engineers by
                            providing a variety of professional
                            trainings, which allows them to test their skills through yearly competitions
                            and teaches them teamwork by integrating them in the IEEE family.</p>
                    </header>

                    <div className="row about-cols">

                        <div data-aos = "fade-right" className="col-md-4 wow fadeInUp">
                            <div className="about-col">
                                <div className="img">
                                    <img src={require('../../../assets/img/about_photos/about-mission.webp')} alt="" className="img-fluid" />
                                    <div className="icon"><i className="fab fa-cloudscale"/></div>
                                </div>
                                <h2 className="title"><a>Our Mission</a></h2>
                                <p>
                                    We are here to show the world the beauty of computer science through the diverse efforts
                                    of our talented community. We are dedicated to improving technical skills by providing
                                    access to the latest trends through conferences, publications, and workshops with our
                                    country's most known researchers and industry leaders.
                                </p>
                            </div>
                        </div>

                        <div data-aos = "fade-up" className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="about-col">
                                <div className="img">
                                    <img src={require('../../../assets/img/about_photos/about-plan.webp')} alt="" className="img-fluid"/>
                                    <div className="icon"><i className="fas fa-brain"/></div>
                                </div>
                                <h2 className="title"><a>Our Plan</a></h2>
                                <p style={{textAlign:'center'}}>
                                    Our Plan is S.M.A.R.T:
                                    <br />
                                    Solve
                                    <br />
                                    Motivate
                                    <br />
                                    Aspire
                                    <br />
                                    Renovate
                                    <br />
                                    Think
                                    <br />
                                    <br />

                                </p>
                            </div>
                        </div>

                        <div data-aos = "fade-left" className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="about-col">
                                <div className="img">
                                    <img src={require('../../../assets/img/about_photos/about-vision.webp')} alt="" className="img-fluid"/>
                                    <div className="icon"><i className="far fa-eye"/></div>
                                </div>
                                <h2 className="title"><a>Our Vision</a></h2>
                                <p>
                                    We strive to reinvent how people exchange knowledge, integrating information technology,
                                    computer science, and engineering. We want to share a sense of community, collaboration,
                                    and enthusiasm, and to provide a unique environment that makes exploring the world of
                                    computer science more exciting.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}

export default AboutSection;
