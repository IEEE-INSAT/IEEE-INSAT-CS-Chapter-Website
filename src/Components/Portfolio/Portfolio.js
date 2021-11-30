import React, {useEffect} from "react";
import HeaderCarousel from "./HeaderCarousel";
import PortfolioMain from "./PortfolioMain";
import "./../../assets/css/Portfolio.css";
import Footer from "../Home/footer/Footer";
import MyNavbar from "../MyNavbar";


const events = [
    {
        title: "BIOIT",
        alt: 'BIOIT',
        text: "BIOIT is a collaboration between the CS and the EMB chapters and in our university. A 24 hours\n" +
            "challenge in which teams solved diverse problematics related to biology and medicine using IT...",
        modalText: "BIOIT is a collaboration between the CS and the EMB chapters and in our university. A 24 hours\n" +
            "challenge in which teams solved diverse problematics related to biology and medicine using IT.\n" +
            "12 teams came out with 12 brilliant ideas during this hackathon but just one of them won the\n" +
            "1000TND price. Thus, all the participants admitted that they enjoyed the event and learned from\n" +
            "it.\n" +
            "The competition began with an opening ceremony in which the project manager welcomed the\n" +
            "participants. Then the technical specifications were distributed and each team picked a subject to\n" +
            "work on. by 11:15 am a workshop on how to choose a project idea was held to help the teams get\n" +
            "started.\n" +
            "Since the entrepreneurial side of the project matters as one of the winner selection criteria, we\n" +
            "provided the participations with a business model workshop by 22h and finally we helped them\n" +
            "with some pitching techniques so they can master their presentation to the jury members.\n" +
            "the workshops were provided by Mr YOUSSEF BEN YOUNESS, Mr BEN TRAD MOHAMED\n" +
            "ALAEDDINE, Mr NADER ZOUAOUI.\n" +
            "8DEC 11:00 all the participants devices were shut down, 15 mins later the teams pitched their\n" +
            "ideas to the jury. 4 teams were selected to the finals were each team presented its project in front\n" +
            "of everyone.\n" +
            "the jury members were selected from the most qualified experts from each of these domains: IT,\n" +
            "biology, entrepreneurs.\n" +
            "Last, the award was given to the winner at the closing ceremony.\n" +
            "the participants appreciated the fact that the competition was well organized and thanked us for\n" +
            "the opportunity.",
        carouselImages: [
            {
                altText: 'BIOIT'
            },
            {
                altText: 'BIOIT'
            },
            {
                altText: 'BIOIT'
            },
            {
                altText: 'BIOIT'
            },
            {
                altText: 'BIOIT'
            },
            {
                altText: 'BIOIT'
            },
        ]
    },
    {
        title: "Introduction to data science and python basics",
        alt: 'Data science',
        text: "We have been surprised by the number of attendants. It seems that our project is interesting  to a lot of ambitious people and we hope to give our best to new learners !",
        modalText: "We have been surprised by the number of attendants. It seems that our project is interesting  to a lot of ambitious people and we hope to give our best to new learners !",
        carouselImages: [
            {
                altText: 'data science'
            },
        ]
    },
    {
        title: "Intro to Computer Network",
        alt: 'Intro to Computer Network',
        text: "Oussema Ghorlbel is an active IEEE CS member, certified in CCNET and JNCIA introduced computer network to our guests in a such a responsive workshop.",
        modalText: "Oussema Ghorlbel is an active IEEE CS member, certified in CCNET and JNCIA introduced computer network to our guests in a such a responsive workshop.",
        carouselImages: [
            {
                altText: 'computer network'
            },
            {
                altText: 'computer network'
            },
            {
                altText: 'computer network'
            },
        ]
    },
    {
        title: "Intro to React JS",
        alt: 'Intro to React JS',
        text: "Introduction to React JS was an advanced training session held by Raed Ouerfelli the IEEE CS chapter Web Master.\n" +
            "Attendants were able to understand the fundamentals of React JS and its uses in web development.",
        modalText: "Introduction to React JS was an advanced training session held by Raed Ouerfelli the IEEE CS chapter Web Master.\n" +
            "Attendants were able to understand the fundamentals of React JS and its uses in web development.",
        carouselImages: [
            {
                altText: 'ReactJS'
            },
            {
                altText: 'ReactJS'
            },
            {
                altText: 'ReactJs'
            },
        ]
    },
    {
        title: "IEEEXtreme",
        alt: 'IEEEXtreme',
        text: "On October 18th, IEEE INSAT CS Student Branch had the pleasure to host the 24 hour programming competition, IEEEXtreme.\n" +
            "It all started with a grand opening. Our participants were welcomed with warm tea and biscuits, followed with some singing performances...",
        modalText: "On October 18th, IEEE INSAT CS Student Branch had the pleasure to host the 24 hour programming competition, IEEEXtreme.\n" +
            "It all started with a grand opening. Our participants were welcomed with warm tea and biscuits, followed with some singing performances.\n" +
            "Then, after verifying their presence, each team was assigned their seats in INSAT’s reading room.\n" +
            "After taking pictures of the teams, they logged in and the countdown started.\n" +
            "The moment that the competition started, the atmosphere shifted into one of hardwork, such a scene made us feel nothing but pride.\n" +
            "And while we waited for the coffee to be prepared we served them some sandwiches.\n" +
            "Meanwhile, our organization team was in the process to prepare the gaming room, which basically consisted of two TVs and some games.\n" +
            "As soon as the sun started rising, we took our participants to have their picture taking on INSAT’s rooftop.\n" +
            "At approximately 7 AM, we started to prepare coffee again to be served with some Daily’n delights.\n" +
            "By now most of our participants were feeling a little tired, so our staff started to motivate them and joke with them in order to lift their spirit up.\n" +
            "We served another set of sandwiches in the afternoon, and the competition continued until 8 PM.\n" +
            "By that time everybody got home, and our staff made sure to clean everything up.\n" +
            "All in all, it was an amazing experience to the staff and the participants to be a part of such a great competition and be able to take a step into competitive programming.",
        carouselImages: [
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
            {
                altText: 'IEEEXtreme'
            },
        ]
    },
    {
        title: "Summer school",
        alt: 'Summer school',
        text: 'Summer school, organized by the IEEE INSAT Student Branch, is a way to turn students\' summer\n' +
            '                            into a\n' +
            '                            productive one...',
        modalText: "Summer school is a joint action organized by the whole IEEE INSAT SB, aiming to turn the students' summer into a productive one.\n" +
            "We, the Computer Society Chapter, took this opportunity to offer the students multiple trainings in several domains linked to our field of expertise such as: mobile development, web development, and others. \n" +
            "Thus, it is a great occasion to get introduced the modern development and design technologies.\n",
        carouselImages: [
            {
                altText: 'Summer School'
            },
            {
                altText: 'Summer School'
            },
        ]

    },
    {
        title: "IEEE Day",
        alt: 'IEEE Day',
        text: "Since we believe in the power of the team, we always start the year by offering students\n" +
            "                            from our institute the\n" +
            "                            opportunity to join our big family...",
        modalText: "Since we’re all about team power, it is important for us to always start the academic year by offering students from our institute the opportunity to join our big family. \n" +
            "Therefore, IEEE Day is an occasion to celebrate our welcoming spirit and to make students feel interested and motivated, show them what they can achieve with us, and to convince them that this is the place where they belong as future engineers and can bring the best of them.\n",
        carouselImages: [
            {
                altText: 'Ieee day'
            },
            {
                altText: 'Ieee day'
            },
        ]
    },
    /*{
        title: "DataOverflow",
        alt: 'DataOverflow',
        text: "DataOverflow is the newest and most exclusive program created by IEEE INSAT Computer Society\n" +
            "                            Chapter and INSAT ACM Student\n" +
            "                            Chapter...",
        modalText: "DataOverflow is the newest and most exclusive program created by IEEE INSAT Computer Society Chapter and INSAT ACM Student Chapter. \n" +
            "It's a full Machine Learning scholarship that ends with a big 24 hours hackathon. \n" +
            "We can't give more details about it for now! better stay tuned because something big’s cooking!\n" +
            "\n",
        carouselImages: [
            {
                altText:'DataOverflow'
            },
        ]
    },*/
    {
        title: "Hour of code",
        alt: 'Hour of code',
        text: "Hour of Code is a global movement held in more than 180 countries every year, reaching tens\n" +
            "                            of millions of students...",
        modalText: "Hour of Code is a global movement held in more than 180 countries every year, reaching tens of millions of students.\n" +
            "It started as a one-hour introduction to computer science, designed to demystify \"code\", to show that anybody\n" +
            "can learn the basics, and to broaden participation in the field of computer science.\n" +
            "Every year, IEEE INSAT Computer Society Chapter takes part in this international event aiming to establish better\n" +
            "educational skills among the youth and target the future engineers.\n",
        carouselImages: [
            {
                altText: 'hour of code'
            },
            {
                altText: 'hour of code'
            },
        ]
    },
    {
        title: "Meet's",
        alt: 'Meet\'s',
        text: "Monthly Enhancement of Engineer’s Technical and Soft Skills or as it's known \"MEETS'S\" is a\n" +
            "                            monthly event based on\n" +
            "                            thrill, knowledge and excitement...",
        modalText: "Monthly Enhancement of Engineer’s Technical and Soft Skills or as it's known \"MEETS'S\" is a monthly event based on\n" +
            "thrill, knowledge and excitement. This event presents a number of training sessions, each handling a specific topic\n" +
            "assured by anonymous specialists whom you get to discover the session's day. ",
        carouselImages: [
            {
                altText: 'Meet\'s'
            },
            {
                altText: 'Meet\'s'
            },
        ]
    },
    {
        title: "IEEE Grand Tech",
        alt: 'IEEE Grand Tech',
        text: "IEEE Grand Tech Tunisia is an international event that highlights the newest technologies.\n" +
            "                            It holds workshops\n" +
            "                            and conferences about various computer science domains...",
        modalText: "IEEE Grand Tech Tunisia is an international event highlighting the newest technologies. It holds workshops \n" +
            "and conferences about various computer science domains such as Web Development, Artificial Intelligence, Virtual Reality\n" +
            "and others. Moreover, it is a unique opportunity to forge and improve soft skills as it offers several trainings related to that. The sessions are well conducted by highly qualified national and international experts.\n",
        carouselImages: [
            {
                altText: 'Grand Tech'
            },
            {
                altText: 'Grand Tech'
            },
        ]
    },
    {
        title: "Trainings",
        alt: 'Trainings',
        text: "IEEE CS Chapter also offers multiple HardSkills and SoftSkills trainings throughout the year\n" +
            "                            collaborating other\n" +
            "                            organizations and individuals...",
        modalText: "IEEE CS Chapter also offers multiple Hard skills and Soft skills trainings throughout the year.\n" +
            "We analyze and create statistics about what the students must learn in order to come up with better fitted programs and achieve greater professional benefits for our community.\n",
        carouselImages: [
            {
                altText: 'Trainings'
            },
            {
                altText: 'Trainings'
            },
        ]
    },
];

function Portfolio() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <>
            <div style={{
                position:"fixed",
                width:'100%',
                zIndex:9999
            }}>
                <MyNavbar fixed={false}/>
            </div>
            <HeaderCarousel/>
            <PortfolioMain events={events} buttonExists={false}/>
            <Footer/>
        </>

    )
}


export default Portfolio;
