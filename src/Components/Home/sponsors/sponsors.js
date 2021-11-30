import React from "react";
import classes from './sponsors.module.css';


const sponsors = ({show}) => {

    const redirectToLink = (link,e) => {
        e.preventDefault();
        if(link != '') {
            window.open(link,"_blank");
        }
    }

    const sponsors_list = [
        {
            id: 1,
            logo: require("../../../assets/img/sponsors/logos/globalnet.webp"),
            link: 'https://www.gnet.tn/'
        },
        {
            id: 2,
            logo: require("../../../assets/img/sponsors/logos/daylin.webp"),
            link: ''
        },
        {
            id: 3,
            logo: require('../../../assets/img/sponsors/logos/nordisk.webp'),
            link: 'http://www.novonordisk.tn/'
        },
        {
            id: 4,
            logo: require('../../../assets/img/sponsors/logos/stb.webp'),
            link: 'http://www.stb.com.tn/fr/'
        },

    ];


    return (
        <>{show &&
        (<section className={classes.section}>

            <div className={classes.container}>

                <div className="section-header">
                    <h3><span className="our-sponsor-title" style={{color:"#ff6535"}}>Our</span> <span
                        style={{color:"#29588c"}}>Sponsors</span></h3>
                </div>

                <div className={classes.content}>

                    {sponsors_list.map(sponsor => (
                        <div key={sponsor.id} className={["m-4", classes.logoHover].join(' ')}>
                            <a onClick={e => redirectToLink(sponsor.link,e)} ><img className="img-fluid" src={sponsor.logo}
                                                        alt="sponsor Image failed to load" width="150px"/></a>
                        </div>
                    ))}

                </div>

            </div>
        </section>)}
        </>

    )
};

export default sponsors;
