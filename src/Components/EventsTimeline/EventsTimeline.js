
import React, {useEffect} from 'react';
import MyNavbar from "../MyNavbar";
import Footer from "../Home/footer/Footer";
import Timeline from "./Timeline";
import Contact from "../Home/contact/Contact";

function EventsTimeline() {
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
            <Timeline />
            <Footer/>
        </>

    )
}

export default EventsTimeline;
