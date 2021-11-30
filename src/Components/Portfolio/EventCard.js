import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button} from 'reactstrap';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        marginRight: "auto",
        marginBottom: 40,
        marginLeft: "auto"
    },
    media: {
        height: 140,
    },
});



export default function EventCard(props) {
    const classes = useStyles();
    const handleButtonClick = () => {
        props.onClick(props.title, props.children , props.modalText , props.carouselImages , props.buttonExists);
    }
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.img}
                    title={props.alt}
                />
                <CardContent>
                    <Typography  gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.children}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={handleButtonClick} className={'btn-ec'} color={'transparent'} style={{color:"#5c5c5c"}}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
