import Avatar from "../../assets/img/logoptsgf.png";
import styled from "styled-components";
import { FaReact } from "react-icons/fa";
import { motion } from "framer-motion";
import "../../assets/css/landing.css";
import { Container, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate, NavLink } from "react-router-dom";

import LOGOSection from "../../assets/img/download.png";

const Nav = styled.nav`
  background: white;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem calc((80vw - 1000px) / 2);
  z-index: 10;
  border-bottom: 4px solid #51a142;
  p {
    color: #51a142;
  }
`;

const NavLinkStyle = styled(NavLink)`
  color: #51a142;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #f26722;
  }

  &:hover {
    color: #f26722;
    transition: 0.2s ease-in-out;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -10px;
`;

const Logo = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;

  img {
  }
`;
// border-style: solid;
// border-color: #f26722;
// #51a142
// border-radius: 500px;

const Section = styled(motion.section)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: transparent;
  color: #fff;
`;

const AboutSection = styled.section`
  padding: 50px 20px;
  background: #f8f9fa;
  color: #333;
`;

const ServicesSection = styled.section`
  padding: 50px 20px;
  background: #fff;
  color: #333;
`;

const FooterSection = styled.footer`
  padding: 20px;
  background: #333;
  color: #fff;
  text-align: center;
`;

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 3, transition: { duration: 5 } },
};

export default function Landing({ children, onClick, disabled }) {
  const navigate = useNavigate();
  return (
    <div>
      <Nav>
        <NavLinkStyle to="/" exact>
          <Logo>
            <img src={Avatar} width={75} height={50} alt="" />
          </Logo>
          <p>SGFM</p>
        </NavLinkStyle>
        <NavMenu>
          <NavLinkStyle to="/about" exact>
            About
          </NavLinkStyle>
          <NavLinkStyle to="/services" exact>
            Services
          </NavLinkStyle>

          <button class="cool-button" onClick={() => navigate("/apps/login")}>
            Login
          </button>
        </NavMenu>
      </Nav>

      <Section id="home">
        <Container
          as={motion.section}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <img src={LOGOSection} width={1000} height={350} alt="" />
          {/* 
          <Button variant="light"></Button>
          <button class="cool-button" >
            Learn More
          </button> */}
        </Container>
      </Section>
      <AboutSection id="about">
        {/* <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p> */}
      </AboutSection>
      <ServicesSection id="services">
        {/* <h2>Our Services</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p> */}
      </ServicesSection>
      <FooterSection>
        <p>&copy; {new Date().getFullYear()} PT SGF Manufacturing.</p>
      </FooterSection>
    </div>
  );
}
