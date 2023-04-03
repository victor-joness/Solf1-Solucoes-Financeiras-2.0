import React, { useState, useEffect } from "react";
import "./Register.css";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import logo from "../../images/LOGO.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  /* useEffect(() => {
    if (auth.id) {
      navigate("/dashboard");
    }
  }, [auth.id, navigate]); */

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickRegister = (e) => {
    const user = {
      ...e,
      isAdmin: 0,
      Img: "AVATAR-USER.png",
    };

    console.log(user);

    dispatch(registerUser(user)).then((res) => {
      toast.success("Registro com sucesso");
    });
  };

  const validationRegister = yup.object().shape({
    username: yup
      .string()
      .min(5, "Seu username deve ter pelo menos 5 caracteres")
      .required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("insira um email valido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "Sua senha deve ter pelo menos 6 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .required("Este campo é obrigatório")
      .test("passwords-match", "A senha deve ser igual", function (value) {
        return this.parent.password === value;
      }),
  });

  const escolheuLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container-register">
      <div className="container-register-center">
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <h1>Register</h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}
        >
          <Form className="Form-container">
            <div className="form-container-username">
              <Field
                name="username"
                autoComplete="off"
                placeholder="Username do Usuário"
                className="form-field"
                type="text"
              ></Field>
              <ErrorMessage
                component="span"
                name="username"
                className="form-error"
              ></ErrorMessage>
            </div>

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

            <div className="form-container-confirmPassword">
              <Field
                name="confirmPassword"
                className="form-field"
                placeholder="Confirme sua senha"
                autoComplete="off"
                type="password"
              ></Field>
              <ErrorMessage
                component="span"
                name="confirmPassword"
                className="form-error"
              ></ErrorMessage>
            </div>

            <button className="form-container-submit" type="submit">
              Submit
            </button>

            <h2 className="form-container-account">
              Você já tem uma conta ? <p onClick={escolheuLogin}>Login</p>
            </h2>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
