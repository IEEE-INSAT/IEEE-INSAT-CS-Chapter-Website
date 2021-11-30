import React from "react";
import {bounce} from "react-animations";
import styled, {keyframes} from "styled-components";
import Fade from "react-reveal";
// reactstrap components
import {Container} from "reactstrap";

// core components

function Header() {
    const Bounce = styled.div`animation : 2s ${keyframes`${bounce}`} infinite`;
    return (
        <>
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require("../../assets/img/header-bg.png") + ")",
                    height: "100vh",
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: "center"
                }}
            >
                <Fade up>
                    <div className="content-center">
                        <Container>
                            <div className="title-brand text-center" style={{marginTop: "10%"}}>

                                <h1 style={{fontSize: "100px", fontFamily: "railway"}}
                                    className="presentation-title display-1">
                                    News </h1>

                            </div>
                        </Container>
                    </div>
                </Fade>

            </div>
        </>
);
}

export default Header;
