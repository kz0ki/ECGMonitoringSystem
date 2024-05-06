import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, Form, Formik } from "formik";
import { checkVerifyCode, getVerifyCode, register } from "api/queries";
import AddPatientForm from "components/Forms/AddPatientForm";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "25px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    padding: theme.spacing(2),
  },
  wrapper: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    margin: "auto",
    backgroundColor: "#ffffff",
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  menuItem: {},
}));
const AddPatient = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);

  const handleAddPatient = async (values) => {
    const response = await register(values);
    console.log(response);
  };
  return (
    <Container className={classes.container}>
      <Box className={classes.wrapper}>
        <Typography variant="h4" className={classes.title}>
          Add Patient
        </Typography>
        <AddPatientForm
          classes={classes}
          emailVerify={emailVerify}
          setEmailVerify={setEmailVerify}
          handleAddPatient={handleAddPatient}
        />
      </Box>
    </Container>
  );
};
export default AddPatient;
