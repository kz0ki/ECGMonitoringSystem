import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { checkVerifyCode, getVerifyCode } from "api/queries";
import React from "react";
import ValidationAddPatient from "components/Forms/AddPatientForm/validation";

const AddPatientForm = ({
  classes,
  handleAddPatient,
  emailVerify,
  setEmailVerify,
}) => {
  return (
    <Formik
      initialValues={{
        first_name: null,
        last_name: null,
        sur_name: "",
        address: "",
        phone: "",
        email: null,
        verify: "",
        date_of_birth: "",
        gender: " ",
      }}
      onSubmit={(variables, form) => {
        handleAddPatient(variables);
      }}
      validationSchema={ValidationAddPatient}
    >
      {({ values, submitForm, setFieldValue, errors, touched, resetForm }) => (
        <Form>
          <Box className={classes.wrapperForm}>
            <Box className={classes.field}>
              <InputLabel id="first_name" className={classes.label}>
                First name
              </InputLabel>
              <Field
                name="first_name"
                id="first_name"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.first_name}
                onChange={(e) => setFieldValue("first_name", e.target.value)}
                error={errors.first_name && touched.first_name}
                component={TextField}
                helperText={
                  errors.first_name && touched.first_name
                    ? errors.first_name
                    : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="last_name" className={classes.label}>
                Last name
              </InputLabel>
              <Field
                name="last_name"
                id="last_name"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.last_name}
                onChange={(e) => setFieldValue("last_name", e.target.value)}
                error={errors.last_name && touched.last_name}
                component={TextField}
                helperText={
                  errors.last_name && touched.last_name ? errors.last_name : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="sur_name" className={classes.label}>
                Sur name
              </InputLabel>
              <Field
                name="sur_name"
                id="sur_name"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.sur_name}
                onChange={(e) => setFieldValue("sur_name", e.target.value)}
                error={errors.sur_name && touched.sur_name}
                component={TextField}
                helperText={
                  errors.sur_name && touched.sur_name ? errors.sur_name : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="address" className={classes.label}>
                Address
              </InputLabel>
              <Field
                name="address"
                id="address"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.address}
                onChange={(e) => setFieldValue("address", e.target.value)}
                error={errors.address && touched.address}
                component={TextField}
                helperText={
                  errors.address && touched.address ? errors.address : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="email" className={classes.label}>
                Email
              </InputLabel>
              <Field
                name="email"
                id="email"
                type="email"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                error={errors.email && touched.email}
                component={TextField}
                helperText={errors.email && touched.email ? errors.email : ""}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => {
                        setEmailVerify(true);
                        getVerifyCode(
                          values.email,
                          values.first_name,
                          values.last_name,
                        );
                      }}
                      variant="text"
                      color="primary"
                      style={{
                        fontSize: "16px",
                      }}
                      disabled={
                        !values.email ||
                        !values.first_name ||
                        !values.last_name ||
                        (errors.email && touched.email)
                      }
                    >
                      Verify
                    </Button>
                  ),
                }}
              />
              {emailVerify ? (
                <Box>
                  <InputLabel id="code" className={classes.label}>
                    Verify email code
                  </InputLabel>
                  <Field
                    name="code"
                    id="code"
                    type="number"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                    value={values.code}
                    onChange={(e) => setFieldValue("code", e.target.value)}
                    error={errors.code && touched.code}
                    component={TextField}
                    helperText={errors.code && touched.code ? errors.code : ""}
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => {
                            const handle = async () => {
                              const response = await checkVerifyCode(
                                values.email,
                                values.code,
                              );
                              if (response?.data?.success) {
                                setFieldValue("verify", true);
                                setEmailVerify(false);
                                resetForm();
                              }
                            };
                            handle();
                          }}
                          color="primary"
                          variant={"text"}
                          style={{
                            minWidth: "135px",
                            fontSize: "16px",
                          }}
                          disabled={!values.email || !emailVerify}
                        >
                          Verify code
                        </Button>
                      ),
                    }}
                  />
                </Box>
              ) : null}
            </Box>
            <Box className={classes.field}>
              <InputLabel id="phone" className={classes.label}>
                Phone
              </InputLabel>
              <Field
                name="phone"
                id="phone"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                error={errors.phone && touched.phone}
                component={TextField}
                helperText={errors.phone && touched.phone ? errors.phone : ""}
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="date_of_birth" className={classes.label}>
                Birthday
              </InputLabel>
              <Field
                name="date_of_birth"
                id="date_of_birth"
                type="date"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={values.date_of_birth}
                onChange={(e) => setFieldValue("date_of_birth", e.target.value)}
                error={errors.date_of_birth && touched.date_of_birth}
                component={TextField}
                helperText={
                  errors.date_of_birth && touched.date_of_birth
                    ? errors.date_of_birth
                    : ""
                }
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel id="gender" className={classes.label}>
                Gender
              </InputLabel>
              <NativeSelect
                fullWidth
                value={values.gender}
                onChange={(event) => {
                  setFieldValue("gender", event.target.value);
                }}
              >
                <option
                  style={{
                    padding: "8px 16px",
                    minHeight: "48px",
                    boxSizing: "border-box",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    cursor: "pointer",
                    "&:disabled:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  value={"Female"}
                >
                  Female
                </option>
                <option className={classes.menuItem} value={"Male"}>
                  Male
                </option>
              </NativeSelect>
            </Box>
          </Box>
          <Button
            color={"success"}
            onClick={submitForm}
            variant={"contained"}
            disabled={!values.verify}
          >
            ADD PATIENT
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPatientForm;
