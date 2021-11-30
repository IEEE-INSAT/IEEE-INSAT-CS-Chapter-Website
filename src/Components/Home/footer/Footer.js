import React from "react";
import './footer.css';
import logo from "../../../assets/img/logoSmall.png";
import {Link} from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
    return (
        <>
            <div className="footer-bottom-area bg-footer section-padding-sm pt-3">
                <div className="container">
                    <div className="row widgets footer-widgets">

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-widget widget-about">
                                <h5 className="widget-title">About Us</h5>
                                <a className="logo" href="#">
                                    <img src={logo} alt="logo" width={70} className="d-block pb-4"/>
                                </a>
                                <p style={{color : '#ffffff',fontSize : '16px'}}>We are a team of enthusiastic engineers having a common interest: our love for INSAT and the IEEE community.</p>

                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-widget widget-quick-links">
                                <h5 className="widget-title">Useful links</h5>
                                <ul>
                                    <li>  <HashLink className="link" to='/#contact' smooth ><span>> Contact Us</span></HashLink></li>
                                    <li>
                                        <Link className="link"
                                              to='/member-of-the-month'><span>> Member of The Month</span> </Link></li>
                                    <li>
                                        <Link className="link" to='/news'><span>> News</span></Link></li>
                                    <li>
                                        <Link className="link" to='/activities'><span>> Activities</span>
                                    </Link></li>
                                    <li>
                                        <Link className="link" to='/eventstimeline'><span>> Events Timeline</span>
                                    </Link></li>

                                </ul>
                            </div>
                        </div>


                        <div className="col-lg-4 col-md-10 col-12 ">
                            <div className="single-widget widget-contact">
                                <h5 className="widget-title">Visit Us</h5>
                                   <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe width="380" height="220" id="gmap_canvas"
                                                src="https://maps.google.com/maps?q=insat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                                frameBorder="0" scrolling="no" marginHeight="0"
                                                marginWidth="0"></iframe>
                                        <a href="https://torrent9-fr.com"></a></div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <hr width="90%" className="hrCopyRights mx-auto"/>
                    <div className="custom-wrapper d-flex justify-content-between align-items-baseline">
                        <div className="text-left py-1">
                            <a href="#">&copy; {new Date().getFullYear()} Copyright: IEEE Computer Society INSAT Student Branch Chapter</a>
                        </div>
                        <div >
                            {/*className="pr-5"*/}
                            <div className="social">
                                <a href="https://www.facebook.com/INSAT.CS/" target="_blank">
                                    <i className="fab fa-facebook-f">
                                    </i>
                                </a>
                                <a href="https://www.instagram.com/ieee_cschapterinsatsb/" target="_blank">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/ieee-insat-sb-cs-chapter-984266190/"
                                   target="_blank">
                                    <i className="fab fa-linkedin-in"></i></a>

                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}

export default Footer;
