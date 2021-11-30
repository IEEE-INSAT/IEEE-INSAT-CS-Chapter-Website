import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {GoGithubAction} from "react-icons/go";
import {MdDateRange} from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import {FaFacebookSquare} from "react-icons/all";
import {AiFillInstagram} from "react-icons/ai";
import Button from '@material-ui/core/Button';
import './New.css';
const New = (props) => {
    const useStyles = makeStyles((theme) => ({
        title: {
            minHeight: '40px',
            color: '#ffa05a'
        },
        subTitle: {
            minHeight: '25px',
            color: '#81a0aa'
        },
        iconStyle: {
            display: "flex",
            alignItems: "center",
        },
        svgStyle: {
            marginRight: '10px'
        },
        cardStyle: {
            marginBottom: "20px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);",
            border: "1px  solid  rgba( 0 , 0 , 0 , 0.1 )"
        },
        description: {
            fontFamily: 'Roboto , Sans Serif',
            textAlign:'justify'
        }
    }));
    const classes = useStyles();

    const {item} = props;
    const redirectToLink = (link,e) => {
        e.preventDefault();
        window.open(link,"_blank");
    }

    return (<div
        className="card">
        <div className="row ">
            {props.left ?
                <>
                    <div className="Card-Content col-md-6 px-3">
                        <div className="card-block px-6">


                            <div className="animate-box">
                                <Typography variant="h4" color="textSecondary" className={classes.title} gutterBottom>
                                    <div className={classes.iconStyle}>
                                        <GoGithubAction className={classes.svgStyle}/> {item.title}
                                    </div>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.subTitle}>
                                    <div className={classes.iconStyle}>
                                        <MdDateRange className={classes.svgStyle}/> {item.date}
                                    </div>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.description}>
                                    {item.description}
                                </Typography>
                                <hr id="hrSep"/>
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                                    <div>
                                        <button
                                            color="primary"
                                            className="more"
                                            onClick={e => redirectToLink(item.moreLink,e)}>
                                            Form Link
                                        </button>
                                    </div>
                                    <div>
                                        <IconButton
                                            aria-label="add to favorites"
                                            onClick={e => redirectToLink(item.fbLink,e)}
                                        >

                                            <FaFacebookSquare/>
                                        </IconButton>
                                        <IconButton
                                            onClick={e => redirectToLink(item.igLink,e)}
                                            aria-label="add to favorites">
                                            <AiFillInstagram/>
                                        </IconButton>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="col-md-6">
                        <div id={`Carousel${item.id}`} className="carousel slide" data-ride="carousel">
                            {/*<ol className="carousel-indicators">*/}
                            {/*<li data-target={`#Carousel${item.id}`} data-slide-to="0" className="active"></li>*/}
                            {/*<li data-target={`#Carousel${item.id}`} data-slide-to="1"></li>*/}
                            {/*<li data-target={`#Carousel${item.id}`} data-slide-to="2"></li>*/}

                            {/*</ol>*/}
                            <div className="carousel-inner">

                                {item.imagesUrl.map((image,index) => {
                                        if (index === 0)
                                            return (<div className="carousel-item active" key={index}>
                                                <img className="d-block" src={require(`../../../assets/img/news/news images/${image}`)}
                                                     alt=""/>
                                            </div>)
                                        else {
                                           return(<div className="carousel-item" key={index}>
                                                <img className="d-block" src={require(`../../../assets/img/news/news images/${image}`)}
                                                     alt=""/>
                                            </div>)
                                        }
                                    }
                                )}



                                <a className="carousel-control-prev" href={`#Carousel${item.id}`} role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href={`#Carousel${item.id}`} role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="col-md-6">
                        <div id={`Carousel${item.id}`} className="carousel slide" data-ride="carousel">
                            {/*<ol className="carousel-indicators">*/}
                            {/*    <li data-target={`#Carousel${item.id}`} data-slide-to="0" className="active"></li>*/}
                            {/*    <li data-target={`#Carousel${item.id}`} data-slide-to="1"></li>*/}
                            {/*    <li data-target={`#Carousel${item.id}`} data-slide-to="2"></li>*/}

                            {/*</ol>*/}
                            <div className="carousel-inner">
                                {item.imagesUrl.map((image,index) => {
                                        if (index === 0)
                                            return (<div className="carousel-item active" key={index}>
                                                <img className="d-block" src={require(`../../../assets/img/news/news images/${image}`)}
                                                     alt=""/>
                                            </div>)
                                        else {
                                            return(<div className="carousel-item" key={index}>
                                                <img className="d-block img-fluid" src={require(`../../../assets/img/news/news images/${image}`)}
                                                     alt=""/>
                                            </div>)
                                        }
                                    }
                                )}

                                <a className="carousel-control-prev" href={`#Carousel${item.id}`} role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href={`#Carousel${item.id}`} role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="Card-Content col-md-6 px-3">
                        <div className="card-block px-6">


                            <div className="animate-box">
                                <Typography variant="h4" color="textSecondary" className={classes.title} gutterBottom>
                                    <div className={classes.iconStyle}>
                                        <GoGithubAction className={classes.svgStyle}/> {item.title}
                                    </div>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.subTitle}>
                                    <div className={classes.iconStyle}>
                                        <MdDateRange className={classes.svgStyle}/> {item.date}
                                    </div>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.description}>
                                    {item.description}
                                </Typography>
                                <hr id="hrSep"/>
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                                    <div>
                                        <button color="primary" className="more"
                                                onClick={e => redirectToLink(item.moreLink,e)}
                                        >Form Link</button>
                                    </div>
                                    <div>
                                        <IconButton
                                            aria-label="add to favorites"
                                            onClick={e => redirectToLink(item.fbLink,e)}
                                        >

                                            <FaFacebookSquare/>
                                        </IconButton>
                                        <IconButton
                                            aria-label="add to favorites"
                                            onClick={e => redirectToLink(item.igLink,e)}
                                        >
                                            <AiFillInstagram/>
                                        </IconButton>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </>
            }
        </div>
    </div>);


};
export default New;
