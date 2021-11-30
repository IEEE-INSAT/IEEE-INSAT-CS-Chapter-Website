import React from 'react';
import logo from "../../../assets/img/logoSmall.png"
import Contact from "../contact/Contact";
import './footer.css';

function Footer() {
    return (
        <>
            <Contact/>
            <footer className="text-center pos-re main-footer">
                <div className="container myFooter">
                    <a className="logo" href="#">
                        <img src={logo}  alt="logo" width={40}/>
                    </a>

                    <div className="social">
                        <a href="https://www.facebook.com/INSAT.CS/" target="_blank">
                            <i className="fab fa-facebook-f">
                            </i>
                        </a>
                        <a href="https://www.instagram.com/ieee_cschapterinsatsb/" target="_blank">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/ieee-insat-sb-cs-chapter-984266190/" target="_blank"><i className="fab fa-linkedin-in"></i></a>

                    </div>

                    <p>&copy; IEEE INSAT CS CHAPTER</p>
                </div>


            </footer>

        </>
);
}

export default Footer;
