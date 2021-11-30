import React from "react";
import './PreviousMemberWeek.css';

const PreviousMemberWeek = ({left, fullName, gender, image, characteristics, description}) => {


    return (
        <div className="card mb-5 mx-auto shadow rounded prevCard" >
            <div className="row no-gutters">
                {left ?
                    <>
                        <div className="col-md-4">
                        <img src={image} className="card-img" alt="Member avatar"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 style={{color:'#ffa05a'}} className="card-title">{fullName}</h3>
                            <h4 style={{color:'#81a0aa'}}>{gender === 'male' ? 'He' : 'She'} is known for being:
                                {characteristics.join(', ')}
                            </h4>
                            <p style={{fontSize:"20px"}} className="card-text">{description}</p>

                        </div>

                    </div></>
                    :<>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 style={{color:'#ffa05a'}} className="card-title">{fullName}</h3>
                            <h4 style={{color:'#81a0aa'}}>{gender === 'male' ? 'He' : 'She'} is known for being:
                                {characteristics.join(', ')}</h4>
                            <p style={{fontSize:"20px"}} className="card-text">{description}</p>

                        </div>
                    </div>
                    <div className="col-md-4">
                    <img src={image} className="card-img" alt="Member avatar"/>
                    </div></>}


            </div>
        </div>)
};

export default PreviousMemberWeek;
