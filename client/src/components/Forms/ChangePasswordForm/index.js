import React from "react";
import { makeStyles } from "@mui/styles";
import { Field, Form, Formik } from "formik";
import { Box, Button, InputLabel, TextField } from "@mui/material";
import ValidationChangePassword from "components/Forms/ChangePasswordForm/validation";

const useStyles = makeStyles(() => ({
  wrapper: {},
}));
const ChangePasswordForm = ({ handleChangePass, handleClose }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        old_password: null,
        new_password1: null,
        new_password2: null,
      }}
      onSubmit={(values) => {
        handleChangePass(values);
        handleClose();
      }}
      validationSchema={ValidationChangePassword}
    >
      {({ values, submitForm, setFieldValue, errors, touched, resetForm }) => (
        <Form>
          <Box className={classes.wrapperForm}>
            <Box className={classes.field}>
              <InputLabel id="old_password" className={classes.label}>
                Old password
              </InputLabel>
              <Field
                name="old_password"
                id="old_password"
                type="password"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.old_password}
                onChange={(e) => setFieldValue("old_password", e.target.value)}
                error={errors.old_password && touched.old_password}
                component={TextField}
                helperText={
                  errors.old_password && touched.old_password
                    ? errors.old_password
                    : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="new_password1" className={classes.label}>
                New password
              </InputLabel>
              <Field
                name="new_password1"
                id="new_password1"
                type="password"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.new_password1}
                onChange={(e) => setFieldValue("new_password1", e.target.value)}
                error={errors.new_password1 && touched.new_password1}
                component={TextField}
                helperText={
                  errors.new_password1 && touched.new_password1
                    ? errors.new_password1
                    : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="new_password2" className={classes.label}>
                Confirm new password
              </InputLabel>
              <Field
                name="new_password2"
                id="new_password2"
                type="password"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.new_password2}
                onChange={(e) => setFieldValue("new_password2", e.target.value)}
                error={errors.new_password2 && touched.new_password2}
                component={TextField}
                helperText={
                  errors.new_password2 && touched.new_password2
                    ? errors.new_password2
                    : ""
                }
              />
            </Box>
          </Box>
          <Box
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={submitForm}>Submit</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default ChangePasswordForm;
