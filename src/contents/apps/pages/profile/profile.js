import React from "react";
import { Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "../../../../assets/img/download.png";

export default function Profile() {
  const Section = styled(motion.section)`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: transparent;
    color: #fff;
  `;

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 3, transition: { duration: 5 } },
  };
  return (
    <div>
      <h1 width={900} height={350}>
        Halaman Admin
      </h1>
      <Section id="home">
        <Container
          as={motion.section}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <img src={Logo} width={900} height={350} alt="" />
          {/* 
          <Button variant="light"></Button>
          <button class="cool-button" >
            Learn More
          </button> */}
        </Container>
      </Section>
    </div>
  );
}
