import React, {useEffect} from 'react'
import CountUp from 'react-countup';
import Aos from "aos";
import 'aos/dist/aos.css';
import './facts.css';

function Facts() {

    useEffect(() => {
        Aos.init({
            duration:2000,
            disable: 'mobile',
            once: true,
            mirror: false
        });
    },[]);
    return (
        <section id="facts" className="wow fadeIn">
            <div className="container">

                <header className="section-header">
                    <h3><span className="facts-title">Facts</span></h3>
                    <p className="facts-description">IEEE Computer Society Chapter - INSAT Student Branch was founded by IEEEians with a passion for Software and
                        Computer Science in March of 2015 and has since moved from strength to strength. Today we are home for:
                    </p>
                </header>

                <div className="row counters">

                    <div data-aos="fade-right" className="col-lg-3 col-6 text-center">
                        <span  data-toggle="counter-up">
                            <CountUp data-aos = "fade-down" prefix={"+"} start={0} end={130} duration={2.75} delay={1}>
                            </CountUp>
                        </span>
                        <br/>
                        <p className="facts-description">Members</p>
                        <img src="https://img.icons8.com/bubbles/100/000000/student-male.png" alt="cs computer society ieee insat student image"/>
                    </div>

                    <div data-aos="fade-down" className="col-lg-3 col-6 text-center">
                        <span data-toggle="counter-up"><CountUp prefix={"+"} start={0} end={20} delay={1} duration={2.75}/></span>
                        <br/>
                        <p className="facts-description">Training Sessions</p>
                        <img src="https://img.icons8.com/dusk/100/000000/training.png" alt="cs computer society ieee insat training sessions image"/>
                    </div>

                    <div data-aos="fade-up" className="col-lg-3 col-6 text-center">
                        <span data-toggle="counter-up"><CountUp prefix={"+"} start={0} end={6} duration={2.75} delay={1}/></span>
                        <br/>
                        <p className="facts-description">Events</p>
                        <img src="https://img.icons8.com/cute-clipart/100/000000/tear-off-calendar.png" alt="cs computer society ieee insat facts image"/>
                    </div>

                    <div data-aos="fade-left" className="col-lg-3 col-6 text-center">
                        <span data-toggle="counter-up"><CountUp prefix={"+"} start={0} end={4} duration={2.75} delay={1}/></span>
                        <br/>
                        <p className="facts-description">Sponsors</p>
                        <img src="https://img.icons8.com/dusk/100/000000/crowdfunding.png" alt="cs computer society ieee insat sponsors image"/>
                    </div>

                </div>

            </div>
        </section>
    );

}

export default Facts;
