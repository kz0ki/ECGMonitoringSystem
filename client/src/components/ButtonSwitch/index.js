import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const ButtonSwitch = ({ switchChangeHandler, options, currentOptionValue }) => {
  const useStyles = makeStyles(() => ({
    button: {
      border: "2px solid",
      height: "40px",
      borderRadius: 0,
      borderColor: "black ",
      color: "black !important",
    },
    activeButton: {
      backgroundColor: "#E9F2FF",
      color: "#136AE4  !important",
      borderColor: "#136AE4 !important",
    },
    unActiveButton: {
      borderColor: "black !important",
    },
    switchElement: {
      display: "flex",
      alignItems: "center",
    },
  }));
  const classes = useStyles();

  return (
    <Box style={{ marginRight: "15px" }}>
      {options.map((el) => (
        <Tooltip
          key={el.value}
          title={el?.tooltip || ""}
          placement={el?.tooltipPlacement || "top"}
          arrow
        >
          <Button
            variant="outlined"
            className={`${classes.button} ${
              currentOptionValue === el.value
                ? classes.activeButton
                : classes.unActiveButton
            }`}
            onClick={switchChangeHandler(el.value)}
          >
            <div className={classes.switchElement}>{el.icon}</div>
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ButtonSwitch;
