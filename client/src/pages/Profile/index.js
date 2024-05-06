import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  NativeSelect,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { formatFullName } from "../../utils";
import {
  changePassword,
  fetchMe,
  getAddInform,
  updateUser,
} from "../../api/queries";
import { Field, Form, Formik } from "formik";
import ChangePasswordModal from "components/Modals/ChangePasswordModal";
import UpdateUserAccountForm from "components/Forms/UpdateUserAccountForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    height: "92%",
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
  status: {
    width: "100%",
    padding: theme.spacing(2),
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
  },
  success: {
    backgroundColor: "#6bd26f",
    color: "#FFFFFF",
    borderColor: "#388E3C",
  },
  error: {
    backgroundColor: "#F44336",
    color: "#FFFFFF",
    borderColor: "#D32F2F",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [additionalInform, setAdditionalInform] = useState(null);
  const [editData, setEditData] = useState(false);
  const [isOpenChangePass, setOpenChangePass] = useState(false);
  const [user, setUser] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState(null);
  useEffect(() => {
    setUser(props);
  }, []);
  useEffect(() => {
    const fetchAdditionalData = async () => {
      const response = await getAddInform();
      setAdditionalInform(response?.data);
    };
    fetchAdditionalData();
  }, []);

  const handleChangePassword = async (values) => {
    const response = await changePassword(values);
    setEditData(false);
    if (response) {
      if (!response?.data?.success) {
        setStatusUpdate(["Password didnt update!", false]);
        setTimeout(() => {
          setStatusUpdate(null);
        }, 1500);
      }
      if (response.data?.success) {
        setStatusUpdate(["Password updated success!", true]);
        setTimeout(() => {
          setStatusUpdate(null);
        }, 1500);
      }
    }
    const userME = await fetchMe();
    setUser(userME?.data?.user);
  };
  const handleClose = () => {
    setOpenChangePass((prevState) => !prevState);
  };
  const handleUpdateAccount = async (values) => {
    const response = await updateUser(values);
    setEditData(false);
    if (response) {
      if (!response?.data?.success) {
        setStatusUpdate(["Account didnt update!", false]);
        setTimeout(() => {
          setStatusUpdate(null);
        }, 1500);
      }
      if (response.data?.success) {
        setStatusUpdate(["Account updated success!", true]);
        setTimeout(() => {
          setStatusUpdate(null);
        }, 1500);
      }
    }
    const userME = await fetchMe();
    setUser(userME?.data?.user);
  };
  return (
    <Container maxWidth="100%" style={{ height: "100vh" }}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h1" className={classes.sectionTitle}>
          Profile {user?.doctor?.id ? "Doctor" : "Patient"}
        </Typography>
        {statusUpdate && (
          <Box
            className={`${classes.status}  ${
              statusUpdate[1] ? classes.success : classes.error
            }`}
          >
            {statusUpdate[0]}
          </Box>
        )}
        {editData ? (
          <UpdateUserAccountForm
            user={user}
            handleUpdateAccount={handleUpdateAccount}
            setEditData={setEditData}
            classes={classes}
          />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Name:</strong> {user?.first_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Last name:</strong> {user?.last_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Surname:</strong> {user?.sur_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {user?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Phone:</strong> {user?.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Date of birth:</strong> {user?.date_of_birth}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Gender:</strong> {user?.gender}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Address:</strong> {user?.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setEditData(true)}
              >
                Change Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setOpenChangePass(true)}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid style={{ marginTop: "15px" }}>
          {user?.doctor?.id ? (
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
      <ChangePasswordModal
        isOpen={isOpenChangePass}
        handleClose={handleClose}
        handleChangePassword={handleChangePassword}
      />
    </Container>
  );
};

export default Profile;
