/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import classnames from "classnames"
import myLogo from "../assets/img/logoSmall.png"
import logoW from "../assets/img/logoWhite.png"
import {Link} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Container from "reactstrap/es/Container";

function MyNavbar(props) {
    const [isOpen , setIsOpen] = useState(false);
    const [navbarColor , setNavbarColor] = useState("navbar-transparent");
    const [logoWidth , setLogoWidth] = useState("40px");
    const [logo , setLogo] = useState(myLogo);
    const iconStyle = {
        marginRight:'5px',
        marginBottom:'5px',
        color:'white'
    }

    const updateNavbarColor =() => {
        if(window.innerWidth > 768) {
            if (
                document.documentElement.scrollTop > 59 ||
                document.body.scrollTop > 59
            ) {
                setNavbarColor("");
                setLogoWidth("30px");
                setLogo(logoW);
            } else if (
                document.documentElement.scrollTop < 60 ||
                document.body.scrollTop < 60
            ) {
                setNavbarColor("navbar-transparent");
                setLogoWidth("40px");
                setLogo(myLogo);
            }
        }else{
            setNavbarColor("");
            setLogoWidth("30px");
            setLogo(logoW);
        }
    }

    useEffect(() => {
        if (!props.fixed) {
            setIsOpen(false);
            setNavbarColor("navbar-transparent");
            setLogoWidth("40px");
            setLogo(myLogo);
        }else{
            setIsOpen(false);
            setNavbarColor("");
            setLogoWidth("30px");
            setLogo(logoW);
        }
        updateNavbarColor();
        if (!props.fixed)
            window.addEventListener("scroll", updateNavbarColor);

        return () => window.removeEventListener("scroll", updateNavbarColor);

    } , [props , window.innerWidth]);

    const toggle=()=> {
        setNavbarColor("");
        setIsOpen(!isOpen);
    }
    return(
        <div>
            <Navbar className={classnames("", navbarColor)} light expand="md">
                <Container>
                    <NavbarBrand href="/" onClick={()=>{window.scrollTo(0,0)}}><img src={logo} alt="logo"
                                                                                    width={logoWidth}/></NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="nav-link nav-item" >
                                <Link to="/" onClick={()=>{window.scrollTo(0,0)}}>
                                    <i className="fas fa-home" style={iconStyle}/>
                                    <span> Home</span>
                                </Link>
                            </NavItem>
                            <NavItem className="nav-link nav-item">
                                <Link to="/member-of-the-month">
                                    <i className="fas fa-star" style={iconStyle}/>
                                    <span>Member of the Month</span>
                                </Link>
                            </NavItem>
                            <NavItem className="nav-link nav-item">
                                <Link to={"/news"}>
                                    <i className="fas fa-newspaper" style={iconStyle}/>
                                    <span>News</span>
                                </Link>
                            </NavItem>
                            <NavItem className="nav-link nav-item">
                                <Link to={"/activities"}>
                                    <i className="fas fa-file-alt" style={iconStyle}/>
                                    Activities
                                </Link>
                            </NavItem >
                            <NavItem className="nav-link nav-item">
                                <Link to={"/eventstimeline"}>
                                    <i className="fas fa-calendar-alt" style={iconStyle}/>
                                    Events Timeline
                                </Link>
                            </NavItem>
                            {/*<NavItem>*/}
                            {/*    <NavLink><Link to={"/CSTC"}>CSTC </Link></NavLink>*/}
                            {/*</NavItem>*/}

                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default MyNavbar;

// export default class MyNavbar extends React.Component {
//
//     constructor(props) {
//         super(props);
//         if (!this.props.fixed) {
//             this.state = {
//                 isOpen: false,
//                 navbarColor: "navbar-transparent",
//                 logoWidth: "40px",
//                 logo: logo,
//             };
//         }else{
//             this.state = {
//                 isOpen: false,
//                 navbarColor: "",
//                 logoWidth: "30px",
//                 logo: logoW,
//             };
//         }
//
//     }
//
//     toggle=()=> {
//         this.setState((prevState,props) =>{return {
//             isOpen: !prevState.isOpen,
//             navbarColor: "",}}
//         );
//     }
//
//     componentDidMount() {
//
//         const updateNavbarColor = () => {
//             if(window.innerWidth > 768) {
//                 if (
//                     document.documentElement.scrollTop > 59 ||
//                     document.body.scrollTop > 59
//                 ) {
//                     this.setState({navbarColor: "", logoWidth: "30px", logo: logoW});
//                 } else if (
//                     document.documentElement.scrollTop < 60 ||
//                     document.body.scrollTop < 60
//                 ) {
//                     this.setState({navbarColor: "navbar-transparent", logoWidth: "40px", logo: logo});
//                 }
//             }else{
//                 this.setState({navbarColor: "", logoWidth: "30px", logo: logoW});
//             }
//         };
//         if (!this.props.fixed)
//             window.addEventListener("scroll", updateNavbarColor);
//
//     }
//
//
//
//
//     render() {
//         const iconStyle = {
//             marginRight:'5px',
//             marginBottom:'5px',
//             color:'white'
//         }
//         return (
//             <div>
//                 <Navbar className={classnames("", this.state.navbarColor)} light expand="md">
//                     <Container>
//                         <NavbarBrand href="/" onClick={()=>{window.scrollTo(0,0)}}><img src={this.state.logo} alt="logo"
//                                                    width={this.state.logoWidth}/></NavbarBrand>
//                         <NavbarToggler onClick={this.toggle}/>
//                         <Collapse isOpen={this.state.isOpen} navbar>
//                             <Nav className="ml-auto" navbar>
//                                 <NavItem className="nav-link nav-item" >
//                                         <Link to="/" onClick={()=>{window.scrollTo(0,0)}}>
//                                             <i className="fas fa-home" style={iconStyle}/>
//                                             <span> Home</span>
//                                         </Link>
//                                 </NavItem>
//                                 <NavItem className="nav-link nav-item">
//                                         <Link to="/member-of-the-month">
//                                             <i className="fas fa-star" style={iconStyle}/>
//                                             <span>Member of the Month</span>
//                                         </Link>
//                                 </NavItem>
//                                 <NavItem className="nav-link nav-item">
//                                         <Link to={"/news"}>
//                                             <i className="fas fa-newspaper" style={iconStyle}/>
//                                             <span>News</span>
//                                         </Link>
//                                 </NavItem>
//                                 <NavItem className="nav-link nav-item">
//                                         <Link to={"/activities"}>
//                                             <i className="fas fa-file-alt" style={iconStyle}/>
//                                                 Activities
//                                         </Link>
//                                 </NavItem >
//                                 <NavItem className="nav-link nav-item">
//                                         <Link to={"/eventstimeline"}>
//                                             <i className="fas fa-calendar-alt" style={iconStyle}/>
//                                             Events Timeline
//                                         </Link>
//                                 </NavItem>
//                                 {/*<NavItem>*/}
//                                 {/*    <NavLink><Link to={"/CSTC"}>CSTC </Link></NavLink>*/}
//                                 {/*</NavItem>*/}
//
//                             </Nav>
//                         </Collapse>
//                     </Container>
//                 </Navbar>
//             </div>
//         );
//     }
//
//
// }
