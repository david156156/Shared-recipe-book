import { FunctionComponent } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/index.css";
import { register } from "../services/userService";
import { User } from "../interfaces/User";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const { token, setToken } = useUser();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().trim().required("שם פרטי הוא שדה חובה"),
      lastName: Yup.string().trim().required("שם משפחה הוא שדה חובה"),
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("אימייל הוא שדה חובה"),
      password: Yup.string()
        .min(8, "הסיסמה חייבת להיות באורך של 8 תווים לפחות")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d).*$/,
          "הסיסמה חייבת להכיל לפחות אות אחת, מספר אחד ותו מיוחד"
        )
        .required("סיסמה היא שדה חובה"),
    }),
    onSubmit: async (values: User) => {
      try {
        const response = await register(values);
        setToken(response);
        alert("ההרשמה בוצעה בהצלחה");
        navigate("/");
      } catch (error) {
        alert("registration failed");
      }
    },
  });

  return (
    <>
      <div className="login-container">
        <h1>הרשמה</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="firstName">שם פרטי</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="login-error">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="login-form-group">
            <label htmlFor="lastName">שם משפחה</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="login-error">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="login-form-group">
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="login-error">{formik.errors.email}</div>
            )}
          </div>
          <div className="login-form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="login-error">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="login-submit-button"
            disabled={!formik.isValid}
          >
            הרשמה
          </button>
        </form>
        <div className="login-footer">
          כבר יש לך חשבון? <a href="/login">התחבר עכשיו</a>
        </div>
      </div>
    </>
  );
};

export default Register;
