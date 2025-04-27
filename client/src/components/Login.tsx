import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/index.css";
import { loginUser } from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { useUser } from "../context/userContext";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { token, setToken } = useUser();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "הסיסמה חייבת להיות באורך של 8 תווים לפחות")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d).*$/,
          "הסיסמה חייבת להכיל לפחות אות אחת, מספר אחד ותו מיוחד"
        )
        .required("Required"),
    }),
    onSubmit: async (values: loginUser) => {
      try {
        const response = await login(values);
        setToken(response);
        alert("ההתחברות בוצעה בהצלחה");
        navigate("/");
      } catch (error) {
        alert("login failed");
      }
    },
  });

  return (
    <>
      <div className="login-container">
        <h1>התחברות</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
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
            {formik.touched.email && formik.errors.email ? (
              <div className="login-error">{formik.errors.email}</div>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <div className="login-error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="login-submit-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "מתחבר..." : "התחבר"}
          </button>
        </form>
        <div className="login-footer">
          אין לך חשבון? <a href="/register">הירשם עכשיו</a>
        </div>
      </div>
    </>
  );
};

export default Login;
