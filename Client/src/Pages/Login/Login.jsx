import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../images/LOGO.png";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { loginUser, loadUser } from "../../Features/authSlice";

import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.id) {
      navigate("/dashboard");
    }
  }, [auth.id, navigate]);

  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("insira um email valido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "Sua senha deve ter pelo menos 6 caracteres")
      .required("Este campo é obrigatório"),
  });

  const handleClickLogin = (values) => {
    dispatch(loginUser(values)).then((res) => {
      if (res.meta.requestStatus == "rejected") {
        toast.error("Email ou senha errado");
      } else {
        toast.success("Login com Sucesso");
      }
    });
  };

  const escolheuRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container-login">
      <div className="container-login-center">
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form className="Form-container">
            <div className="form-container-email">
              <Field
                name="email"
                autoComplete="off"
                placeholder="Email do Usuário"
                className="form-field"
                type="email"
              ></Field>
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              ></ErrorMessage>
            </div>

            <div className="form-container-password">
              <Field
                name="password"
                className="form-field"
                placeholder="Senha Do Usuário"
                autoComplete="off"
                type="password"
              ></Field>
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              ></ErrorMessage>
            </div>

            <button className="form-container-submit" type="submit">
              Submit
            </button>

            <h2 className="form-container-account">
              Você ainda não tem uma conta ?{" "}
              <p onClick={escolheuRegister}>Registrar-se</p>
            </h2>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
