import React, { useState } from "react";
import NavBar from "components/NavBar";
import { Box, Typography } from "@mui/material";
import Footer from "components/Footer";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  background: {
    backgroundImage: `url(${require("../../assets/medical-equipment-cardiogram.jpg")})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#ffffff",
    minHeight: "780px",
    marginRight: "25px",
    marginLeft: "25px",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.background}>
        <Typography variant="h1" align="center">
          ECG monitoring: keep your heart healthy.
        </Typography>
        <Typography variant="h5" align="center">
          Access ECG recordings, reports and analytics anytime, anywhere.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
