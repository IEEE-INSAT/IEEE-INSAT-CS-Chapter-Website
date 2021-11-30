import React, {Component} from "react";
import EventCard from "./EventCard";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import ModalPortfolio from "./ModalPortfolio";

export default class PortfolioMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalName: "",
            modalText: "",
            carouselImages: [],
            showModal: false,
            buttonExists: false
        };
        this.events = this.props.events;
    }

    handleModal = (name, text, modalText,carouselImages,buttonExists) => {
        this.setState({modalName: name, modalText: modalText, showModal: true , buttonExists:buttonExists , carouselImages:carouselImages});
    }

    render() {
        return (
            <>
                <ModalPortfolio name={this.state.modalName} modalText={this.state.modalText}
                                show={this.state.showModal}
                                carouselImages={this.state.carouselImages}
                                buttonExists = {this.state.buttonExists}
                />
            </>
        )
    }
}
