import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "8px",
    backgroundColor: "white",
    borderTop: "1px solid #E0E0E0",
    marginTop: "25px",
    bottom: 0,
    textAlign: "center",
    boxShadow:
      "0px -1px 10px 0px rgba(0,0,0,0.12), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -2px 4px -1px rgba(0,0,0,0.2)",
  },

  copyright: {
    color: "#a7a6ab",
    padding: "10px 0px ",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Box className={classes.copyright}>
        <Typography>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <span style={{ color: "#ffffff" }}>ECG Monitoring</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
