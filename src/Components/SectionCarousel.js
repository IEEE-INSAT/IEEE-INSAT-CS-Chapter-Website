import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
function SectionCarousel(props) {
    const items = props.items;
    return (
        <React.Fragment>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                transitionTime={500}
            >
                {
                    items.map((item,index)=>{
                        return(
                            <div key={index}>
                                <img src={item.src} alt={item.altText}/>
                            </div>
                        )
                    })
                }
            </Carousel>
        </React.Fragment>
)
}

export default SectionCarousel;
