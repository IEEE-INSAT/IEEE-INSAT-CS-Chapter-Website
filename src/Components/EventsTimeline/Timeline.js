import React, { useEffect } from "react";
import $ from "jquery";
import jQuery from "jquery";
import "./timeline.css";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";

function Timeline() {
  useEffect(() => {
    (function ($) {
      $.fn.timeline = function () {
        $(".timeline-container").animate({ scrollTop: 0 }, "slow");
        var selectors = {
          id: $(this),
          item: $(this).find(".timeline-item"),
          activeClass: "timeline-item--active",
          img: ".timeline__img",
        };
        console.log(selectors);
        selectors.item.eq(0).addClass(selectors.activeClass);
        selectors.id.css(
          "background-image",
          "url(" + selectors.item.first().find(selectors.img).attr("src") + ")"
        );
        var itemLength = selectors.item.length;
        $(window).scroll(function () {
          var max, min;
          var pos = $(this).scrollTop();
          selectors.item.each(function (i) {
            min = $(this).offset().top - 200;
            max = $(this).height() + min;
            if (i === itemLength - 1 && pos > min + $(this).height() / 2) {
              selectors.item.removeClass(selectors.activeClass);
              selectors.id.css(
                "background-image",
                "url(" +
                  selectors.item.last().find(selectors.img).attr("src") +
                  ")"
              );

              selectors.item.last().addClass(selectors.activeClass);
            } else if (pos <= max - 40 && pos >= min) {
              selectors.id.css(
                "background-image",
                "url(" + $(this).find(selectors.img).attr("src") + ")"
              );

              selectors.item.removeClass(selectors.activeClass);
              $(this).addClass(selectors.activeClass);
            }
          });
        });
      };
    })(jQuery);
    $("#timeline-1").timeline();
    // return () => window.removeEventListener('scroll' , $("#timeline-1").timeline());
  }, []);

  const events = [
    {
      id: 13,
      name: "IEEEXtreme 19.0",
      date: "October 2025",
      image: "xtreme-19.png",
      description: `IEEEXtreme is a global competitive programming competition organized by IEEE, lasting 24 hours non-stop. Teams take part in a series of preparatory workshops held three weeks in advance, designed to equip them for solving complex algorithmic problems during the competition. The goal of the event is to develop programming and problem-solving skills while providing students with international visibility. Ahead of the competition, a theatrical "murder case" involving the event's mascot, Abdou, was staged as an engaging storyline to build excitement and foster team spirit before the contest began.`,
    },
    {
      id: 12,
      name: "Summer School 2025",
      date: "Summer 2025",
      image: "summer-school.png",
      description: `Summer School, A series of 15 introductory workshops organized by all Student Branch chapters over the course of a weekend. These sessions are designed to introduce students to a wide range of technical fields, providing them with a solid foundation and helping them explore different domains before choosing a specialization. Special emphasis is placed on the Computer Science workshops for beginners, which focus on fundamental programming concepts, problem-solving basics, and an accessible introduction to computing, making them ideal for students with little or no prior experience.`,
    },
    {
      id: 11,
      name: "AINS",
      date: "June 2025",
      image: "ains.png",
      description: `AINS (Artificial Intelligence National Summit) is the first national conference dedicated to promoting and democratizing Artificial Intelligence. Held over three days in a hotel, it brings together students, professionals, and technology enthusiasts to explore the latest advances in AI. The program features inspiring talks led by experts, hands-on workshops on applying AI across various sectors, poster sessions showcasing research projects, and a pitching hackathon that gives participants the opportunity to turn innovative ideas into concrete solutions.`,
    },
    {
      id: 10,
      name: "Orbit",
      date: "April 2025",
      image: "orbit.png",
      description: `Orbit, The first DevOps competition in Tunisia, is a one-month series of workshops focused on DevOps, MLOps, and Cloud technologies, culminating in the Orbit Contest. The Orbit Contest is a 12-hour DevOps and MLOps hackathon organized at INSAT, where teams of up to three participants work together to solve a series of challenges. This event aims to introduce and further develop students' skills in essential DevOps, MLOps, and Cloud practices. For partner companies, it represents a unique opportunity to meet talented individuals capable of effectively applying these technologies.`,
    },
    {
      id: 9,
      name: "DataQuest",
      date: "February 2025",
      image: "data-overflow.png",
      description: `Data Overflow is a one-month series of workshops in Machine Learning, Artificial Intelligence, and Data Science, culminating in DataQuest. DataQuest is a 20-hour Data Science and AI hackathon organized at INSAT, where teams solve a series of real-world problems by applying the knowledge gained during the workshops. The goal of the event is to strengthen students' practical skills. This hands-on learning experience also provides partner companies with an opportunity to identify talented and highly motivated profiles.`,
    },
    {
      id: 6,
      name: "SummerSchool",
      date: "2-4/10/2020",
      image: "summerSchool.webp",
      description: `Summer school, organized by the IEEE INSAT Student Branch, is a way to turn students' summer 
            into a productive one.
            We, as the Computer Society Chapter, try to offer the students through this event multiple pieces of training 
            in several domains such as mobile development, web development, and others. Thus, 
            it is a great opportunity to get introduced to modern development and design technologies.`,
    },
    {
      id: 5,
      name: "IEEEXtreme",
      date: "24/10/2020",
      image: "xtreem.webp",
      description: `IEEEXtreme is an annual hackathon and competitive programming challenge in which teams of IEEE Student members compete in a 24-hour time span against each other to solve a set of programming problems. The competition is underwritten and coordinated by IEEE's Membership and Geographic Activities department and is often supported by partnering sponsors.
participants are demanded to solve a variety of real-world problems on the 24th of October from 00:00 UTC until 23:59 UTC.
It is a unique experience and an opportunity to rediscover programming from a new angle, to learn, and acquire new problem-solving skills, and to compete with other IEEE students during a fun event!`,
    },
    {
      id: 2,
      name: "DataOverFlow Workshops",
      date: "November",
      image: "do.webp",
      description: `DataOverflow is the newest and most exclusive program created by the IEEE INSAT Computer Society
             Chapter and INSAT ACM Student Chapter. It's a full Machine Learning scholarship that ends with a big 24 hours 
             hackathon. Even though we can't give more 
             details about it, for now, you'd better stay tuned because we're cooking something big!`,
    },
    {
      id: 4,
      name: "HourOfCode",
      date: "8 November",
      image: "hoc.webp",
      description: `Hour Of Code is a global movement reaching tens of millions of students in 180+ countries through 
            a one-hour introduction to computer science and computer programming. Surely enough, the IEEE Computer Society 
            INSAT Student Branch has been taking this opportunity each year since its launch to reach a great number of primary 
            schools in Tunisia to make an impact on our country. By teaching these schools' pupils the basics of programming 
            throughout several computer science activities, developed by the IEEE Computer Society family, designed for all 
            ages and experience levels.`,
    },
    {
      id: 1,
      name: "BioIT",
      date: "December",
      image: "biot.webp",
      description: `BIOIT (BIOlogy and Information Technology) is a collaboration between the Computer Society (CS)
             and the Engineering in Medicine and Biology Society (EMB) chapters at INSAT. It is a 24-hour challenge in which
              teams solve diverse problems related to biology and medicine using IT. BIOIT aims to combine and develop 
              overarching domains that complement each other: Biology, medicine, agriculture, and agronomy on one hand,
               and IT on the other hand. It simply searches to digitalize the different areas of biology and medicine..`,
    },
    {
      id: 3,
      date: "March",
      name: "CSTC",
      image: "grandTech.webp",
      description: `IEEE Grand Tech Tunisia is an international event that highlights the newest technologies. It 
            holds workshops and conferences about various computer science domains such as Web Development, Artificial 
            Intelligence Virtual Reality, and others. Moreover, it is a unique opportunity to forge and improve soft skills
            since it also offers several soft skills pieces of training. The sessions are conducted by highly qualified
            national and international experts.`,
    },
    {
      id: 7,
      name: "DataOverFlow Hackathon",
      date: "April",
      image: "doHack.webp",
      description: `DataOverflow is the newest and most exclusive program created by the IEEE INSAT Computer Society
             Chapter and INSAT ACM Student Chapter. It's a full Machine Learning scholarship that ends with a big 24 hours 
             hackathon. Even though we can't give more 
             details about it, for now, you'd better stay tuned because we're cooking something big!`,
    },
    {
      id: 8,
      name: "Trainings",
      date: "2020 - 2021",
      image: "training.webp",
      description:
        "IEEE CS Chapter also offers multiple HardSkills and SoftSkills training throughout the" +
        " year collaborating with other organizations and individuals. We analyze and create statistics about what students need to learn the most then try our best to offer them pieces of training about the required professional skills, like mobile development and sponsored by former INSAT students in 2017, and entrepreneurship for women in 2018 assured by SheStarts Organization.",
    },
  ];
  let parallax;
  return (
    <div className="timeline-container" id="timeline-1">
      <div className="timeline-header">
        <h2 className="timeline-header__title">Computer Society Chapter</h2>
        <h3 className="timeline-header__subtitle">Events timeline</h3>
      </div>

      <div className="timeline">
        {events.map((event) => (
          <div className="timeline-item" data-text={event.date} key={event.id}>
            <div className="timeline__content">
              <img
                className="timeline__img"
                src={require("../../assets/img/eventstimeline/" + event.image)}
              />
              <h2 className="timeline__content-title">{event.name}</h2>
              <p className="timeline__content-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
