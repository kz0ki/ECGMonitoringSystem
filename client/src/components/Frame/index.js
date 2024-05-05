import React, { useState, useEffect } from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { Box, Container } from "@mui/material";
import withAuth from "../../hocs/hocs";

const Frame = (props) => {
  const { children, user } = props;
  const userData = user || null;
  return (
    <Container
      style={{
        maxWidth: "100vw",
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
    >
      <NavBar user={userData} />
      {children(userData)}
      <Footer />
    </Container>
  );
};
export default withAuth(Frame);
