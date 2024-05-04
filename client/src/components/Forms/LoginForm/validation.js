import * as Yup from "yup";
export const ValidationLogin = Yup.object().shape({
  emailOrPhone: Yup.mixed()
    .required("Email or phone number is required!")
    .test("emailOrPhone", "Invalid email or phone number format", (value) => {
      return (
        Yup.string().email().isValidSync(value) ||
        Yup.string()
          .matches(/^(\+38)[0-9]{10}$/, {
            excludeEmptyString: true,
          })
          .isValidSync(value)
      );
    }),
  password: Yup.string().required("Password is required!").nullable(),
});
