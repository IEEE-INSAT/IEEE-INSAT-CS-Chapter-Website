import React, {Component} from "react";
import {Container} from "reactstrap";
import $ from "jquery";
import Fade from "react-reveal";

export default class HeaderCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // bg: "url(" + require("../../assets/img/bgcarousel/1.jpg") + ")",
            i: 0
        };

    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                i: ++this.state.i,
                // bg: "url(" + require("../../assets/img/bgcarousel/" + this.state.i % 3 + ".jpg") + ")"
            });
            $('.page-header').animate({backgroundImage: this.state.bg});
        }, 4000);

    }

    render() {
        return (
            <>
                <div
                    className="page-header section-dark"
                    style={{
                        backgroundImage: this.state.bg,
                        height: "100vh",
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'cover',
                        transitionDelay: ".5s",
                        display: "block"
                    }}
                >
                    <Fade up>
                        <div className="content-center">
                            <Container>
                                <div className="title-brand text-center" style={{marginTop: "10%"}}>

                                    <h1 style={{fontSize: "100px", fontFamily: "railway"}}
                                        className="presentation-title display-1">
                                        Portfolio </h1>

                                </div>
                            </Container>
                        </div>
                    </Fade>

                </div>
            </>
        )
    }
}
