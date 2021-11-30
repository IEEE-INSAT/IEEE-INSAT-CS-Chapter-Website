import React from 'react';
import $ from "jquery";
import SectionCarousel from "../SectionCarousel";
import Button from "reactstrap/es/Button";
import {Link} from "react-router-dom";

const close = function () {
    $('.modalReact').hide();
}

function ModalPortfolio(props) {
    if (props.show) {
        $('.modalReact').show();
    }


    return (
        <>
            <div id="myModalReact" className="modalReact">
                <div className="modal-text" style={{width: "80%", height: "80%", marginTop: "5"}}>
                    <div className="modal-header">
                        <div className="modal-title"><h4>{props.name}</h4></div>
                        <button type="button" className="close" data-dismiss="modal" onClick={close}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div style={{
                            width: "100%",
                            borderRadius: 20,

                            overflow: "hidden"
                        }}>
                            <SectionCarousel items={props.carouselImages}/>
                        </div>

                        <div style={{
                            marginTop: 100,
                            textAlign: "justify",
                            padding: "0px 50px",
                            fontSize: 17,
                            color: "black",
                            fontFamily: "'Raleway', sans-serif"
                        }}>
                            {props.modalText}
                            <hr/>
                            {props.buttonExists &&
                            <Link to={"/news/"+props.name}>
                                <Button style={{marginLeft: "45%"}} color="warning">
                                    Submit Form
                                </Button>
                            </Link>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ModalPortfolio;
