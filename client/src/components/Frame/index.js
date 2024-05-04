import React, { useState, useEffect } from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { Box } from "@mui/material";
import withAuth from "../../hocs/hocs";

const Frame = (props) => {
  const { children, user } = props;
  const userData = user || null;
  return (
    <Box>
      <div className="main-container">
        <NavBar user={userData} />
        {children(userData)}
        <Footer />
      </div>
    </Box>
  );
};
export default withAuth(Frame);
