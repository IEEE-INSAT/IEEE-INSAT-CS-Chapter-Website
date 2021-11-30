import React from "react";
// reactstrap components
import {Container} from "reactstrap";
import Fade from "react-reveal";
import './header.css';
// core components

function Header({imgPath,height}) {
    return (
        <>
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require(`../../../assets/img/${imgPath}`) + ")",
                    height: `${height}vh`,
                    backgroundAttachment: 'fixed',
                    width: `100%`,
                    backgroundSize: 'cover',
                    backgroundPosition: "center"
                }}
            >
                <div className="content-center">
                    <Container>
                        <div className="title-brand text-center">
                            <Fade left>
                                {/*<Bounce>*/}
                                    <h1 className="presentation-title display-3">
                                        IEEE Computer Society <br/> Chapter </h1>
                                {/*</Bounce>*/}
                            </Fade>
                        </div>
                        <Fade right>
                            <h2 className="presentation-subtitle text-center">
                                INSAT Student Branch
                            </h2>
                        </Fade>
                    </Container>
                </div>


            </div>
        </>
    );
}

export default Header;
