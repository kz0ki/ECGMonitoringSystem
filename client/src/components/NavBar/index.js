import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ReactComponent as Logo } from "assets/pulse-heart-svgrepo-com.svg";
import { makeStyles } from "@mui/styles";
import * as routes from "constants/routes";
import { NavLink } from "react-router-dom";
import LoginModal from "components/Modals/LoginModal";
import axios from "axios";
import { API_URL } from "../../constants";
import { clearToken, setToken } from "../../hocs/hocs";
import { login } from "../../api/queries";

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "8px",
    marginBottom: "25px",
    backgroundColor: "white",
    border: "1px solid #E0E0E0",
    width: "100%",
  },
}));
const NavBar = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleLogin = async (values) => {
    try {
      const response = await login(values);
      if (response?.data?.success) {
        setToken(response?.data?.token);
        window.location.reload();
        handleClose();
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        className={classes.wrapper}
        style={{ backgroundColor: "white" }}
      >
        <Toolbar style={{ display: "flex" }}>
          {" "}
          <Typography
            style={{ display: "flex" }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <NavLink
              to={routes.HOME}
              style={{
                textDecoration: "none",
                color: "#626B74",
                display: "flex",
              }}
            >
              <Logo style={{ height: "40px", width: "40px" }} />
              ECG Monitoring
            </NavLink>{" "}
          </Typography>
          {props.user ? (
            <>
              {" "}
              <NavLink
                to={routes.PROFILE}
                style={{ textDecoration: "none", color: "#626B74" }}
              >
                <Button color="inherit">PROFILE</Button>
              </NavLink>
              {props.user?.doctor ? (
                <>
                  <NavLink
                    to={routes.PATIENTS}
                    style={{ textDecoration: "none", color: "#626B74" }}
                  >
                    <Button color="inherit">PATIENTS</Button>
                  </NavLink>
                  <NavLink
                    to={routes.ADD_PATIENT}
                    style={{ textDecoration: "none", color: "#626B74" }}
                  >
                    <Button color="inherit">ADD_PATIENT</Button>
                  </NavLink>
                </>
              ) : null}
              <NavLink style={{ textDecoration: "none", color: "#626B74" }}>
                <Button
                  onClick={() => {
                    clearToken();
                    window.location.href = routes.HOME;
                  }}
                  color="inherit"
                >
                  Log Out
                </Button>
              </NavLink>
            </>
          ) : (
            <Box
              style={{ textDecoration: "none", color: "#626B74" }}
              onClick={() => handleClose()}
            >
              <Button color="inherit">LOGIN</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <LoginModal
        handleLogin={handleLogin}
        handleClose={handleClose}
        isOpen={isOpen}
      />
    </>
  );
};
export default NavBar;
