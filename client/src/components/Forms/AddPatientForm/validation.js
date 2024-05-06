import * as Yup from "yup";

const ValidationAddPatient = Yup.object().shape({
  sur_name: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone number is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
});
export default ValidationAddPatient;
