import React, {useEffect} from 'react'
import './style.css'
import './fonts/style.css'
import $ from "jquery"
import {Link} from 'react-router-dom'

function CSTC() {
    useEffect(() => {
        $('.dont').click(function (event) {
            event.preventDefault();
        })
    })
    $('a').click(function () {
        var target = $($(this).href());
        if (target.length) {
            var top = target.offset().top;
            $('html,body').animate({scrollTop: top}, 1000);
            return false;
        }
    });
    return (

        <React.Fragment>
            <header class="site-navbar mt-3" id="top">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="site-logo col-6"></div>
                        <nav class="mx-auto site-navigation">
                            <ul class="site-menu js-clone-nav d-none d-lg-block">
                                <li><Link to="/" className={"nav-link"}>Home</Link></li>
                                <li><Link to="/portfolio" className={"nav-link"}>Portfolio</Link></li>
                                <li><Link to="/news" className={"nav-link"}>News</Link></li>
                                <li><Link to="/newsletter" className={"nav-link"}>Newsletter</Link></li>
                                <li><Link to="/cstc" className={"nav-link"}>CSTC</Link></li>

                            </ul>
                        </nav>

                        <div class="col-6 site-burger-menu d-block d-lg-none text-right">
                            <a href="#" class="dont site-menu-toggle js-menu-toggle"><span class="icon-menu h3"></span></a>
                        </div>

                    </div>
                </div>
            </header>
            <section class="home-section section-hero overlay slanted" id="home-section">

                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-8 text-center">
                            <h1>We Are CSTC</h1>
                            <div class="mx-auto w-75">
                                <p>Join us on this chapter and make this century yours.</p>
                            </div>
                            <p class="mt-5"><a href="" class="dont btn btn-outline-white btn-md ">Register Now</a></p>
                        </div>
                    </div>
                </div>

                <div class="video-container">
                    {/*
                    <video autoplay loop="true">
                        <source type="video/mp4" src="videos/video.mp4" />
                    </video>
                    */}
                </div>

                <a href="#about-us-section" class="dont scroll-button smoothscroll">
                    <span class=" icon-keyboard_arrow_down"></span>
                </a>

            </section>
            <section class="site-section about-us-section" id="about-us-section" style={{marginTop: 200}}>
                <div class="container">

                    <div class="row mb-5 pt-0 site-section">
                        <div class="col-md-6 align-self-center">
                            <h3 class="section-title-sub text-primary">About Us</h3>
                            <h2 class="section-title mb-4">Who Are You Guys</h2>

                            <p>The Computer Society Tech Congress (CSTC) is a national event that will be hosted by the
                                IEEE INSAT Computer Society Student Branch Chapter on the 15th, 16th and 17th of March.
                                Our participants will be able to attend workshops and conferences about diverse IT
                                technologies such as Business Intelligence, Data Science, etc…
                                Each year, the workshops will follow a specific theme, which will ensure coherence
                                between the activities. </p>
                            <p>This congress is a great opportunity to enhance your technical and soft skills. With
                                professional speakers and qualified experts, this is a weekend where you can forge a
                                great sense of responsibility and a chance to expand your knowledge.
                                And since this congress isn’t made for IT engineers only, our networking sessions will
                                enrich your point of view on different fields .
                                This congress will be different than the other congresses, there will be a special
                                challenge throughout the whole stay there, where you’ll be able to win a grand prize!
                                <span style={{
                                    fontSize: 18,
                                    display: "block",
                                    color: "#4ea6a7"
                                }}>Everyone is welcome, this century is ours.</span></p>
                        </div>
                        <div class="col-md-5 ml-auto img-overlap">
                            <div class="img-1"><img
                                src="https://www.managementimpact.nl/content/uploads/2019/07/superteam-272x181.jpg"
                                alt="Image" class="img-fluid img-shadow"/></div>
                            <div class="img-2"><img
                                src="https://www.managementimpact.nl/content/uploads/2019/07/superteam-272x181.jpg"
                                alt="Image" class="img-fluid img-shadow"/></div>
                        </div>
                    </div>

                </div>

            </section>
            {/* TEAM */}
            {/*
            <section class="site-section block__62272" id="portfolio-section" style={{marginTop: 200}}>


                <div class="container">

                    <div class="row mb-3">
                        <div class="col-12 text-center" data-aos="fade">
                            <h3 class="section-title-sub text-primary">Meet the </h3>
                            <h2 class="section-title mb-3">team</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-md-4 col-sm-4">
                            <div class="team-member">
                                <div class="team-img">
                                    <img
                                        src="https://image.freepik.com/free-photo/man-standing-with-a-black-t-shirt_1187-1045.jpg"
                                        alt="team member" class="img-responsive"/>
                                </div>
                                <div class="team-hover">
                                    <div class="desk">
                                        <h4>Hi There !</h4>
                                        <p>I love to introduce myself as a hardcore Web Designer.</p>
                                    </div>
                                    <div class="s-link">
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                        <a href="#"><i class="fa fa-google-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="team-title">
                                <h5>Martin Smith</h5>
                                <span>founder & ceo</span>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="team-member">
                                <div class="team-img">
                                    <img
                                        src="https://image.freepik.com/free-photo/man-standing-with-a-black-t-shirt_1187-1045.jpg"
                                        alt="team member" class="img-responsive"/>
                                </div>
                                <div class="team-hover">
                                    <div class="desk">
                                        <h4>Hi There !</h4>
                                        <p>I love to introduce myself as a hardcore Web Designer.</p>
                                    </div>
                                    <div class="s-link">
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                        <a href="#"><i class="fa fa-google-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="team-title">
                                <h5>Martin Smith</h5>
                                <span>founder & ceo</span>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="team-member">
                                <div class="team-img">
                                    <img
                                        src="https://image.freepik.com/free-photo/man-standing-with-a-black-t-shirt_1187-1045.jpg"
                                        alt="team member" class="img-responsive"/>
                                </div>
                                <div class="team-hover">
                                    <div class="desk">
                                        <h4>Hi There !</h4>
                                        <p>I love to introduce myself as a hardcore Web Designer.</p>
                                    </div>
                                    <div class="s-link">
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                        <a href="#"><i class="fa fa-google-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="team-title">
                                <h5>Martin Smith</h5>
                                <span>founder & ceo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            */}
            {/* TEASER */}
            <section class="site-section" id="next-section" style={{marginTop: 200}}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 mb-5 mb-lg-0">
                            <a data-fancybox data-ratio="2" class="block__96788" type="button" data-toggle="modal"
                               data-target="#myModal">
                                <span class="play-icon"><span class="icon-play"></span></span>
                            </a>
                        </div>
                        <div class="col-lg-5 ml-auto">
                            <h3 class="section-title-sub text-primary">Watch the teaser</h3>
                            <h2 class="section-title mb-3">The century is ours!</h2>
                        </div>
                    </div>
                </div>
            </section>

            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">


                        <div class="modal-body">

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item"
                                        src="https://drive.google.com/file/d/1HL_PSN0PlidRlBmQ1mB8N5YMei8pQMkD/preview"
                                        id="video" allowscriptaccess="always" allow="autoplay"></iframe>
                            </div>


                        </div>

                    </div>
                </div>
            </div>


            <footer class="site-footer slanted-footer" style={{marginTop: 300}}>

                <a href="#top" class="dont smoothscroll scroll-top">
                    <span class="icon-keyboard_arrow_up"></span>
                </a>

                <div class="container">
                    <div class="row mb-5">
                        {/*
                        <div class="col-6 col-md-3 mb-4 mb-md-0">
                            <h3>Scenic Products</h3>
                            <ul class="list-unstyled">
                                <li><a href="#">Web Design</a></li>
                                <li><a href="#">Graphic Design</a></li>
                                <li><a href="#">Web Developers</a></li>
                                <li><a href="#">Resources</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-3 mb-4 mb-md-0">
                            <h3>Company</h3>
                            <ul class="list-unstyled">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Career</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Resources</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-3 mb-4 mb-md-0">
                            <h3>Support</h3>
                            <ul class="list-unstyled">
                                <li><a href="#">Support</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                        */}
                        <div class="offset-5 col-6 col-md-3 mb-4 mb-md-0">
                            <h3>Contact Us</h3>
                            <div class="footer-social">
                                <a href="https://www.facebook.com/CSTcongress/" target={'blank'}><span
                                    class="icon-facebook"></span></a>
                                <a href="https://www.instagram.com/cst_congress/" target={'blank'}><span
                                    class="icon-instagram"></span></a>
                                <a href="https://www.linkedin.com/in/cstc-congress-707a921a1/" target={'blank'}><span
                                    class="icon-linkedin"></span></a>
                            </div>
                        </div>
                    </div>

                    <div class="row text-center">
                        <div class="col-12">
                            {/* 
                            <p class="copyright"><small class="block">
                                Copyright &copy;All rights reserved | This template is made with <i class="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
                            </small></p>
                            */}
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default CSTC;
