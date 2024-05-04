import React from "react";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { ValidationLogin } from "components/Forms/LoginForm/validation";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  field: { width: "400px", marginBottom: "14px" },
  label: {
    color: "#333",
  },
}));
const LoginForm = ({ isOpen, handleClose, handleLogin }) => {
  const classes = useStyles();
  return (
    <Formik
      onSubmit={(values) => handleLogin(values)}
      initialValues={{
        emailOrPhone: "",
        password: "",
      }}
      validationSchema={ValidationLogin}
    >
      {({ values, setFieldValue, handleSubmit, touched, errors }) => (
        <Form>
          <Box>
            <Box className={classes.field}>
              <InputLabel id="emailOrPhone" className={classes.label}>
                Enter email or phone
              </InputLabel>
              <Field
                name="key"
                id="key"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.emailOrPhone}
                onChange={(e) => setFieldValue("emailOrPhone", e.target.value)}
                error={errors.emailOrPhone && touched.firstName}
                component={TextField}
                helperText={
                  errors.emailOrPhone && touched.emailOrPhone
                    ? errors.emailOrPhone
                    : ""
                }
                placeholder={"Format mail@mail.com or +380xxxxxxxxx"}
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="password" className={classes.label}>
                Password
              </InputLabel>
              <Field
                name="key"
                id="key"
                type="password"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                error={errors.password && touched.password}
                component={TextField}
                helperText={
                  errors.password && touched.password ? errors.password : ""
                }
              />
            </Box>
          </Box>
          <Box className={classes.modalButtons}>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
