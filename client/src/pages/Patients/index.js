import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ButtonSwitch from "components/ButtonSwitch";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { fetchPatients } from "../../api/queries";
import { formatFullName } from "../../utils";
import { ADD_PATIENT } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
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
    width: "100hh",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
  content: {
    margin: "15px 20px",
  },
  wrapperList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "15px 20px",
  },
  list: {
    fontSize: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    gridAutoColumns: "auto",
    gridAutoFlow: "column",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "50px",
    border: "1px #333C43 solid",
    padding: "8px 15px",
  },
  wrapperCard: {
    cursor: "pointer",
    minWidth: "100%",
    marginTop: "15px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, min(240px))",
    gap: "55px",
  },
  card: {
    borderRadius: "15px",
    border: "1px #333C43 solid",
    display: "flex",
    flexDirection: "column",
    minWidth: "240px",
    marginTop: "10px",
    padding: "15px",
    boxShadow: "7px 7px 3px 0px rgba(0, 0, 0, 0.15)",
  },
}));
const Patients = () => {
  const classes = useStyles();
  const [displayStyle, setDisplayStyle] = useState(false);
  const [displayArchive, setDisplayArchive] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
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
    const setUpData = async () => {
      const response = await fetchPatients();
      if (response?.data?.success) {
        setData(response?.data?.patients);
      }
    };
    setUpData();
  }, []);
  const switchChangeHandler = (value) => (e) => {
    setDisplayArchive(value);
  };
  const switchChangeHandlerTable = (value) => (e) => {
    setDisplayStyle(value);
  };
  const renderData = () => {
    let newData = data;
    if (displayArchive) {
      newData = newData?.filter((item) => item.is_archived === true);
    }
    switch (displayStyle) {
      case false:
        return (
          <Box className={classes.wrapperList}>
            {newData?.map((item) => (
              <Box
                className={classes.list}
                onClick={() => {
                  navigate(`${item.id}`);
                }}
              >
                <Box display={"flex"}>
                  <AccountCircleOutlinedIcon style={{ marginRight: "5px" }} />
                  <Box>{formatFullName(item)}</Box>
                </Box>
                <Box>{item?.phone}</Box>
                <Box>{item?.email}</Box>
                <Box>{item?.date_of_birth}</Box>
                <Box>{item?.address}</Box>
              </Box>
            ))}
          </Box>
        );
      case true:
        return (
          <Box className={classes.wrapperCard}>
            {newData?.map((item) => (
              <Box
                className={classes.card}
                onClick={() => {
                  navigate(`${item.id}`);
                }}
              >
                <Box display={"flex"}>
                  <AccountCircleOutlinedIcon style={{ marginRight: "5px" }} />
                  <Box>{formatFullName(item)}</Box>
                </Box>
                <Box>{item?.phone}</Box>
                <Box>{item?.email}</Box>
                <Box>{item?.date_of_birth}</Box>
                <Box>{item?.address}</Box>
              </Box>
            ))}
          </Box>
        );
      default:
        return <div>Default case</div>;
    }
  };

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
          onClick={() => {
            window.location.href = ADD_PATIENT;
          }}
        >
          ADD NEW PATIENT
        </Button>
      </Box>
      <Box className={classes.content}>{renderData()}</Box>
    </Box>
  );
};

export default Patients;
