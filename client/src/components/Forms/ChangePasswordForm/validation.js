import * as Yup from "yup";

const ValidationChangePassword = Yup.object().shape({
  old_password: Yup.string().required("Old password is required"),
  new_password1: Yup.string().required("New password is required"),
  new_password2: Yup.string()
    .required("Confirm new password is required")
    .oneOf([Yup.ref("new_password1"), null], "Passwords must match"),
});

export default ValidationChangePassword;
