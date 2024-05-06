import { Field, Form, Formik } from "formik";
import {
  Button,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const UpdateUserAccountForm = ({
  user,
  handleUpdateAccount,
  setEditData,
  classes,
}) => {
  return (
    <Formik
      initialValues={{
        first_name: user?.first_name,
        last_name: user?.last_name,
        sur_name: user?.sur_name,
        date_of_birth: user?.date_of_birth,
        gender: user?.gender,
        address: user?.address,
        phone: user?.phone,
        email: user?.email,
      }}
      onSubmit={(values) => handleUpdateAccount(values)}
    >
      {({ values, submitForm, errors, setFieldValue, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Name:</InputLabel>
                <Field
                  name="key"
                  id="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={values.first_name}
                  onChange={(e) => setFieldValue("first_name", e.target.value)}
                  error={errors.first_name && touched.first_name}
                  component={TextField}
                  helperText={
                    errors.first_name && touched.first_name
                      ? errors.emailOrPhone
                      : ""
                  }
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Last name:</InputLabel>{" "}
                <Field
                  name="key"
                  id="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={values.last_name}
                  onChange={(e) => setFieldValue("last_name", e.target.value)}
                  error={errors.last_name && touched.last_name}
                  component={TextField}
                  helperText={
                    errors.last_name && touched.last_name
                      ? errors.last_name
                      : ""
                  }
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Surname:</InputLabel>{" "}
                <Field
                  name="key"
                  id="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={values.sur_name}
                  onChange={(e) => setFieldValue("sur_name", e.target.value)}
                  error={errors.sur_name && touched.sur_name}
                  component={TextField}
                  helperText={
                    errors.sur_name && touched.sur_name ? errors.sur_name : ""
                  }
                />
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Phone:</InputLabel>{" "}
                <Field
                  name="key"
                  id="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={values.phone}
                  onChange={(e) => setFieldValue("sur_name", e.target.value)}
                  error={errors.phone && touched.phone}
                  component={TextField}
                  helperText={errors.phone && touched.phone ? errors.phone : ""}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Email:</InputLabel>{" "}
                <Field
                  name="key"
                  id="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  error={errors.email && touched.email}
                  component={TextField}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Date of birth:</InputLabel>{" "}
                <Field
                  name="date_of_birth"
                  id="date_of_birth"
                  type="date"
                  variant="outlined"
                  size="small"
                  value={values.date_of_birth}
                  onChange={(e) =>
                    setFieldValue("date_of_birth", e.target.value)
                  }
                  error={errors.date_of_birth && touched.date_of_birth}
                  component={TextField}
                  helperText={
                    errors.date_of_birth && touched.date_of_birth
                      ? errors.date_of_birth
                      : ""
                  }
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Gender:</InputLabel>{" "}
                <NativeSelect
                  style={{
                    width: "290px",
                  }}
                  value={values.gender}
                  onChange={(event) => {
                    setFieldValue("gender", event.target.value);
                  }}
                >
                  <option value={"Female"}>Female</option>
                  <option value={"Male"}>Male</option>
                </NativeSelect>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <InputLabel>Address:</InputLabel>{" "}
                <Field
                  name="key"
                  id="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={values.address}
                  onChange={(e) => setFieldValue("address", e.target.value)}
                  error={errors.address && touched.address}
                  component={TextField}
                  helperText={
                    errors.address && touched.address ? errors.address : ""
                  }
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                style={{ backgroundColor: "gray" }}
                className={classes.button}
                onClick={() => {
                  setEditData(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#388E3C" }}
                className={classes.button}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default UpdateUserAccountForm;
