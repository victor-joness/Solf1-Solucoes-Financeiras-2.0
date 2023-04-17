import React, { useEffect, useState } from "react";
import "./Perfil.css";

import axios from "axios";

import Navbar from "../../../Components/Navbar/Navbar";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";

import UserContainer from "../../../Components/UserContainer/UserContainer";
import OptionsContainer from "../../../Components/OptionsContainer/OptionsContainer";
import NotFound from "../../NotFound/NotFound";

import { updateUser } from "../../../Features/authSlice";
import { toast } from "react-toastify";

const Perfil = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  /* console.log(auth); */

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/perfil");
    }
  }, [auth.id, navigate]);

  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:5005/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({
    Img: auth.Img,
    name: auth.name,
    email: auth.email,
    celular: auth.celular,
    password: "",
  });

  const handleClickUpdate = async (e) => {
    let imgUrl = "";

    if (file) {
      imgUrl = await upload();
    }

    //poder ter o update da senha ou nao
    const user = {
      id: auth.id,
      Img: file ? imgUrl : auth.Img,
      name: e.nome ? e.nome : auth.name,
      email: e.email ? e.email : auth.email,
      celular: e.celular ? e.celular : auth.celular,
      password: e.senha ? e.senha : "",
    };

    dispatch(updateUser(user)).then((res) => {
      toast.success("update com sucesso");
    });
  };

  const validationRegister = yup.object().shape({
    nome: yup.string().min(5, "Seu nome deve ter pelo menos 5 caracteres"),
    email: yup.string().email("insira um email valido"),
    celular: yup
      .string()
      .min(11, "Seu Número deve ter pelo menos 11 caracteres")
      .max(11),
    senha: yup.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
  });

  if (auth.token) {
    return (
      <div className="container-perfil">
        <Navbar />
        <div className="container-direita-perfil">
          <Header></Header>(
          <div className="OptionsConta--container">
            <div className="OptionsConta--container--direita">
              <div className="OptionsConta--container--direita__mid">
                <div className="OptionsConta--container--direita--mid__esquerda">
                  <UserContainer></UserContainer>
                  <OptionsContainer></OptionsContainer>
                </div>

                <div className="OptionsConta--container--direita--mid__direita">
                  <div className="OptionsConta--container--direita--mid--direita__infos">
                    <div className="OptionsConta--container--direita--mid--direita--infos__superior">
                      <h1>Informações pessoais</h1>

                      <h3>Editar</h3>
                    </div>

                    <div className="OptionsConta--container--direita--mid--direita--infos--mid__inputs">
                      <Formik
                        initialValues={{}}
                        onSubmit={handleClickUpdate}
                        validationSchema={validationRegister}
                      >
                        <Form className="OptionsConta-form">
                        <h2 className="input-name-form">Imagem Usuário</h2>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <label className="file" htmlFor="file">
                            Upload Image
                          </label>

                          <h2 className="input-name-form">Nome</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="nome"
                              className="form-OptionsConta"
                              placeholder="Nome Do Usuário"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="nome"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Email</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="email"
                              className="form-OptionsConta"
                              placeholder="Email Do Usuário"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="email"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Celular</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="celular"
                              className="form-OptionsConta"
                              placeholder="Celular"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="celular"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Nova Senha</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="senha"
                              className="form-OptionsConta"
                              placeholder="Nova senha"
                              autoComplete="off"
                              type="password"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="senha"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <button
                            className="button2--OptionsConta"
                            type="submit"
                          >
                            Salvar mudança
                          </button>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        </div>
      </div>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default Perfil;
