import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { formatFullName } from "../../utils";
import { getAddInform } from "../../api/queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  button: {
    width: "100%",
    maxWidth: "220px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [additionalInform, setAdditionalInform] = useState(null);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      const response = await getAddInform();
      setAdditionalInform(response?.data);
    };
    fetchAdditionalData();
  }, []);

  return (
    <Container maxWidth="100%">
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h1" className={classes.sectionTitle}>
          Profile {props?.doctor?.id ? "Doctor" : "Patient"}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {props.first_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Last name:</strong> {props.last_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Surname:</strong> {props.sur_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Date of birth:</strong> {props.date_of_birth}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Gender:</strong> {props.gender}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Address:</strong> {props.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Change Profile
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
        <Grid>
          {props?.doctor?.id ? (
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Amount of patients:</strong>{" "}
                {additionalInform?.patients}
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.sectionTitle}>
                My Doctor
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>Full name:</strong>{" "}
                    {formatFullName(additionalInform?.my_doctor)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>Phone:</strong> {additionalInform?.my_doctor?.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>Email:</strong> {additionalInform?.my_doctor?.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
