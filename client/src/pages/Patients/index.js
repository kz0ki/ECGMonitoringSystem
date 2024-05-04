import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ButtonSwitch from "components/ButtonSwitch";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import axios from "axios";
import { API_URL } from "../../constants";
import { clearToken } from "../../hocs/hocs";
import { fetchPatients } from "../../api/queries";
const useStyles = makeStyles((theme) => ({
  headerButtons: {
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  displayButtons: {
    display: "flex",
    flexDirection: "row",
  },
  wrapper: {
    height: "100vh",
    margin: "25px",
    backgroundColor: "#eaeaea",
  },
}));
const Patients = () => {
  const classes = useStyles();
  const [displayStyle, setDisplayStyle] = useState(false);
  const [displayArchive, setDisplayArchive] = useState(false);
  const displayStyleTabs = [
    {
      icon: <TableRowsOutlinedIcon />,
      value: false,
      tooltip: "Table",
    },
    {
      icon: <DashboardOutlinedIcon />,
      value: true,
      tooltip: "Cards",
    },
  ];
  const displayArchiveTabs = [
    { icon: <InboxOutlinedIcon />, value: false, tooltip: "Active" },
    {
      icon: <ArchiveOutlinedIcon />,
      value: true,
      tooltip: "Archived",
    },
  ];
  useEffect(() => {
    const res = fetchPatients();
    console.log(res);
  }, []);
  const switchChangeHandler = (value) => (e) => {
    setDisplayArchive(value);
  };
  const switchChangeHandlerTable = (value) => (e) => {
    setDisplayStyle(value);
  };
  const renderData = (data) => {};
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.headerButtons}>
        <Box className={classes.displayButtons}>
          <ButtonSwitch
            switchChangeHandler={switchChangeHandlerTable}
            currentOptionValue={displayStyle}
            options={displayStyleTabs}
          />
          <ButtonSwitch
            switchChangeHandler={switchChangeHandler}
            currentOptionValue={displayArchive}
            options={displayArchiveTabs}
          />
        </Box>
        <Button
          sx={{
            backgroundColor: "#4284F5",
            color: "white",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#3279f3",
            },
          }}
          color={"primary"}
        >
          ADD NEW PATIENT
        </Button>
      </Box>
      <Box className={classes.content}>{renderData()}</Box>
    </Box>
  );
};

export default Patients;
