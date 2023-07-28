import Avatar from "../../assets/img/logoptsgf.png";
import styled from "styled-components";
import { FaReact } from "react-icons/fa";
import { motion } from "framer-motion";
import "../../assets/css/landing.css";
import { Container, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "../../contents/auth/Login";

const Nav = styled.nav`
  background: #fff;
  color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f26722;
`;

const Logo = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;

  img {
    margin-right: 3px;
  }
`;
// border-style: solid;
// border-color: #f26722;
// border-radius: 500px;
const NavItems = styled.div`
  a {
    color: #333;
    margin: 0 10px;
    text-decoration: none;
    text-transform: upercase;
  }
`;

const HeroSection = styled(motion.section)`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #007bff;
  color: #fff;
  text-align: center;
`;

const Section = styled(motion.section)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #007bff;
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
  visible: { opacity: 1, transition: { duration: 3 } },
};

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Landing Cocokologi
      <button>Login #51a142</button>
      <div>
        <img src={Avatar} width={35} height={35} alt="" />
      </div> */}
      <Nav>
        <Logo>
          <img src={Avatar} width={75} height={50} alt="" />
          SGFM
        </Logo>
        <NavItems>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <button
            style={{ borderRadius: "25px" }}
            className="btn btn-outline-primary px-5 mx-3"
            onClick={() => navigate("/apps/login")}
            outline="primary"
          >
            Login
          </button>
        </NavItems>
      </Nav>

      <Section id="home">
        <Container
          as={motion.section}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>Welcome to Our Site</h1>
          <p>Your success is our mission</p>
          <Button variant="light">Learn More</Button>
        </Container>
      </Section>

      <AboutSection id="about">
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </AboutSection>

      <ServicesSection id="services">
        <h2>Our Services</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </ServicesSection>

      <FooterSection>
        <p>&copy; {new Date().getFullYear()} PT SGF Manufacturing.</p>
      </FooterSection>
    </div>
  );
}
