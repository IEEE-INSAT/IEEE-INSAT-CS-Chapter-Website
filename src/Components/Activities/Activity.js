import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Container from "@material-ui/core/Container";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import { MdDateRange, MdPlace } from "react-icons/md";
import { GoGithubAction } from "react-icons/go";
import { FaFacebookSquare } from "react-icons/all";
import { AiFillInstagram } from "react-icons/all";
import Aos from "aos";
import "./activity.css";
const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    color: "#ffa05a",
    minHeight: "40px",
  },
  subTitle: {
    color: "#81a0aa",
    minHeight: "25px",
  },
  iconStyle: {
    display: "flex",
    alignItems: "center",
  },
  svgStyle: {
    marginRight: "10px",
  },
  cardStyle: {
    marginBottom: "20px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);",
    border: "1px  solid  rgba( 0 , 0 , 0 , 0.1 )",
  },
  descriptionAndDetails: {
    fontFamily: "Roboto , Sans Serif",
    whiteSpace: "pre-line",
    textAlign: "justify",
  },
}));

function Activity(props) {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      disable: "mobile",
      once: true,
      mirror: false,
    });
  }, []);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let base = "../../assets/img/activity/activities/";

  let {
    id,
    title,
    place,
    date,
    description,
    details,
    images,
    facebookUrl,
    instagramUrl,
    baseURL,
  } = props;
  if (baseURL) {
    base = baseURL;
  }
  facebookUrl = facebookUrl ? facebookUrl : "https://www.facebook.com/";
  instagramUrl = instagramUrl ? instagramUrl : "https://www.instagram.com/";
  return (
    <>
      <Container className="themed-container">
        <Row>
          <Col lg="12" md="12" xs="12">
            <Card className={classes.cardStyle} data-aos="fade-up">
              <div
                id={`carousel${id}`}
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {images.map((item, index) => {
                    if (!index) {
                      return (
                        <li
                          key={index}
                          data-target={`#carousel${id}`}
                          data-slide-to={index}
                          className="active"
                        ></li>
                      );
                    }
                    return (
                      <li
                        key={index}
                        data-target={`#carousel${id}`}
                        data-slide-to={index}
                      ></li>
                    );
                  })}
                </ol>
                <div className="carousel-inner">
                  {images.map((item, index) => {
                    if (!index) {
                      return (
                        <div
                          key={`image${index}`}
                          className="carousel-item active"
                        >
                          <img
                            className="d-block w-100"
                            style={{
                              objectFit: "scale-down",
                              width: "70vw",
                              height: "70vh",
                            }}
                            src={require("../../assets/img/" + item)}
                            alt="description image"
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={`image${index}`} className="carousel-item">
                        <img
                          className="d-block  w-100"
                          style={{
                            objectFit: "scale-down",
                            width: "70vw",
                            height: "70vh",
                          }}
                          src={require("../../assets/img/" + item)}
                          alt="description image"
                        />
                      </div>
                    );
                  })}
                </div>
                <a
                  aria-label="ieee cs computer society insat"
                  className="carousel-control-prev"
                  href={`#carousel${id}`}
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  aria-label="ieee cs computer society insat"
                  className="carousel-control-next"
                  href={`#carousel${id}`}
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <CardContent>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className={classes.title}
                  gutterBottom
                >
                  <div className={classes.iconStyle}>
                    <GoGithubAction className={classes.svgStyle} /> {title}
                  </div>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.subTitle}
                  gutterBottom
                >
                  <div className={classes.iconStyle}>
                    <MdPlace className={classes.svgStyle} /> {place}
                  </div>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.subTitle}
                  gutterBottom
                >
                  <div className={classes.iconStyle}>
                    <MdDateRange className={classes.svgStyle} /> {date}
                  </div>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.descriptionAndDetails}
                >
                  {description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(facebookUrl, "_blank");
                  }}
                  aria-label="add to favorites"
                >
                  <FaFacebookSquare />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(instagramUrl, "_blank");
                  }}
                  aria-label="share"
                >
                  <AiFillInstagram />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.descriptionAndDetails}>
                  {details}
                </CardContent>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Activity;
