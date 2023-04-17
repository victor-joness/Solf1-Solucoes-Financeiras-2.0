import React, { useEffect, useState } from "react";
import "./Endereco.css";

import Navbar from "../../../Components/Navbar/Navbar";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";

import UserContainer from "../../../Components/UserContainer/UserContainer";
import OptionsContainer from "../../../Components/OptionsContainer/OptionsContainer";
import NotFound from "../../NotFound/NotFound";

/* import { updateEndereco } from "../../../Features/authSlice"; */
import { toast } from "react-toastify";

const Endereco = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/endereco");
    }
  }, [auth.id, navigate]);

  const [endereco, setEndereco] = useState({});

  /* const [user, setUser] = useState({
    Img: auth.Img,
    name: auth.name,
    email: auth.email,
    celular: auth.celular,
    password: "",
  }); */

  const handleClickUpdate = async (e) => {
    //poder ter o update da senha ou nao
    const endereco = {};

    /* const user = {
      id: auth.id,
      Img: file ? imgUrl : auth.Img,
      name: e.nome ? e.nome : auth.name,
      email: e.email ? e.email : auth.email,
      celular: e.celular ? e.celular : auth.celular,
      password: e.senha ? e.senha : "",
    }; */

    dispatch(updateEndereco(endereco)).then((res) => {
      toast.success("update com sucesso");
    });
  };

  const validationEndereco = yup.object().shape({
    cep: yup.string().min(8, "Seu CEP deve ter pelo menos 8 caracteres"),
    rua: yup.string().min(5, "Sua rua deve ter pelo menos 5 caracteres"),
    numero: yup.string().min(1, "Seu numero deve ter pelo menos 1 caracteres"),
    bairro: yup.string().min(5, "Seu bairro deve ter pelo menos 5 caracteres"),
    cidade: yup.string().min(5, "Sua cidade deve ter pelo menos 5 caracteres"),
    estado: yup.string().min(2, "Seu estado deve ter pelo menos 2 caracteres"),
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
                      <h1>Endereço Pessoal</h1>

                      <h3>Atual</h3>

                      <p>{`Estado, Cidade, Cep, Bairro, Numero`}</p>

                      <h3 className="h3-endereco">Deseja fazer alteração? </h3>
                    </div>

                    <div className="OptionsConta--container--direita--mid--direita--infos--mid__inputs--endereco">
                      <Formik
                        initialValues={{}}
                        onSubmit={handleClickUpdate}
                        validationSchema={validationEndereco}
                      >
                        <Form className="OptionsConta-form">
                          <h2 className="input-name-form">Estado</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="estado"
                              className="form-OptionsConta"
                              placeholder="Estado"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="estado"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Cidade</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="cidade"
                              className="form-OptionsConta"
                              placeholder="Cidade"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="cidade"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Cep</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="cep"
                              className="form-OptionsConta"
                              placeholder="cep"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="cep"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Bairro</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="bairro"
                              className="form-OptionsConta"
                              placeholder="Bairro"
                              autoComplete="off"
                              type="password"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="bairro"
                              className="form-error-edit"
                            ></ErrorMessage>
                          </div>

                          <h2 className="input-name-form">Número</h2>
                          <div className="OptionsConta-form-input">
                            <Field
                              name="numero"
                              className="form-OptionsConta"
                              placeholder="Número"
                              autoComplete="off"
                            ></Field>
                            <ErrorMessage
                              component="span"
                              name="numero"
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

export default Endereco;
