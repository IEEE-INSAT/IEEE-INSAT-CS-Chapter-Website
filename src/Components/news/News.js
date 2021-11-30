import React, {useEffect, useState} from "react";
import Footer from "../Home/footer/Footer";
import MyNavbar from "../MyNavbar";
import New from "./new/New";
import classes from './News.module.css';
import * as news from './news.json';
import Aos from "aos";
import Header from "../Home/header/Header";

const News = () =>{

    const [myNews,setMyNews] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({
            duration: 1700,
            disable: 'mobile',
            once: true,
            mirror: false
        });
        setMyNews(news.default.news);
    });

return(
    <>
        <div style={{
            position: "fixed",
            width: '100%',
            zIndex: 9999
        }}>
            <MyNavbar fixed={false}/>
        </div>
        <div
            className="page-header section-dark"
            style={{
                backgroundImage:
                    "url(" + require("../../assets/img/news/newsBg.webp") + ")",
                height: "60vh",
                width: `100%`,
                backgroundSize: 'cover',
                backgroundPosition: "center"
            }}
        />
        <section  className={classes.news}>
            <div className={classes.container}>
                <header className="section-header">
                    <h3><span className={classes.ourTitle}>Our</span> <span className={classes.newsTitle}>News</span></h3>
                </header>

                <div >
                    {myNews.map((item,index) => {
                        if(index%2)
                        return(
                            <div key={index} data-aos="fade-right">
                                <New key={item.id} item={item} />
                            </div>
                        )
                        else return(
                            <div key={index} data-aos="fade-left">
                                <New key={item.id} item={item} left />
                            </div>
                            )
                    })}
                </div>
            </div>

        </section>

        <Footer/>


    </>
)

}
export default News;
