import React from "react";
import {
    Button

} from "reactstrap";



function TeamMember(props){

    const handleButtonClick = () => {
        props.onClick(props.name,props.text);
    }

        return (
            <>

                <div className="item">
                    <div className="team-img">
                        <img src={require("../../../assets/img/team/"+props.img+".jpg")} width={"100%"}/>
                            <div className="social">
                                <a href={props.fb} target="_blank" className="icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href={props.ln} target="_blank" className="icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>

                                <br/>
                                <br/>
                                <Button
                                    className="btn-round"
                                    outline
                                    type="button"
                                    onClick={handleButtonClick}
                                >
                                    Read more
                                </Button>

                            </div>
                    </div>
                    <div className="info">
                        <h6>{props.name}</h6>
                        <span>{props.post}</span>
                    </div>
                </div>

                
            </>

        );

}

export default TeamMember;
