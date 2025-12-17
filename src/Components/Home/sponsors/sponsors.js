import React from "react";
import classes from "./sponsors.module.css";

const sponsors = ({ show }) => {
  const redirectToLink = (link, e) => {
    e.preventDefault();
    if (link != "") {
      window.open(link, "_blank");
    }
  };

  // Old sponsors (with links):
  /*
        const old_sponsors_list = [
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
        */
  // New sponsors (all logos, no links):
  const sponsors_list = [
    {
      id: 1,
      logo: require("../../../assets/img/sponsors/logos/3b1df013-4f40-4171-95be-c8a479f00ace 1.png"),
      link: "",
    },
    {
      id: 2,
      logo: require("../../../assets/img/sponsors/logos/5fe5587d-6be9-43a7-a4c6-229d498d7cf2 2.png"),
      link: "",
    },
    {
      id: 3,
      logo: require("../../../assets/img/sponsors/logos/68a344f978911bbeeda903f6_3487b4d6a931b25e51c333486600a08a_TC-Logo-Main 1.png"),
      link: "",
    },
    {
      id: 4,
      logo: require("../../../assets/img/sponsors/logos/68a344f978911bbeeda903f6_3487b4d6a931b25e51c333486600a08a_TC-Logo-Main 2.png"),
      link: "",
    },
    {
      id: 5,
      logo: require("../../../assets/img/sponsors/logos/daylin.webp"),
      link: "",
    },
    {
      id: 6,
      logo: require("../../../assets/img/sponsors/logos/globalnet.webp"),
      link: "",
    },
    {
      id: 7,
      logo: require("../../../assets/img/sponsors/logos/Group 206.png"),
      link: "",
    },
    {
      id: 8,
      logo: require("../../../assets/img/sponsors/logos/logo-4 1.png"),
      link: "",
    },
    {
      id: 10,
      logo: require("../../../assets/img/sponsors/logos/nordisk.webp"),
      link: "",
    },
    {
      id: 11,
      logo: require("../../../assets/img/sponsors/logos/stb.webp"),
      link: "",
    },
    {
      id: 12,
      logo: require("../../../assets/img/sponsors/logos/talan-logo 2.png"),
      link: "",
    },
  ];

  return (
    <>
      {show && (
        <section className={classes.section}>
          <div className={classes.container}>
            <div className="section-header">
              <h3>
                <span
                  className="our-sponsor-title"
                  style={{ color: "#ff6535" }}
                >
                  Our
                </span>{" "}
                <span style={{ color: "#29588c" }}>Sponsors</span>
              </h3>
            </div>

            <div className={classes.content}>
              {sponsors_list.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className={["m-4", classes.logoHover].join(" ")}
                >
                  <a onClick={(e) => redirectToLink(sponsor.link, e)}>
                    <img
                      className="img-fluid"
                      src={sponsor.logo}
                      alt="sponsor Image failed to load"
                      width="150px"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default sponsors;
