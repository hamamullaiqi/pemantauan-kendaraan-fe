import React, { useCallback, useState } from "react";
import { Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "../../../../assets/img/download.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { HiMoon, HiOutlineSun, HiOutlineLogout } from "react-icons/hi";
export default function Profile(apps, landing) {
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

  // const logOut = useCallback(() => {
  //   Swal.fire(
  //     {
  //       title: "Anda yakin untuk Keluar?",
  //       text: "Pastikan data sudah tersimpan dengan baik!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, Log Out!",
  //     }.dispatch(logout(navigate("/landing")))
  //   );
  // }, [dispatch]);

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
