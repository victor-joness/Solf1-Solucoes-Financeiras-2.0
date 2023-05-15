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

import { updateEndereco } from "../../../Features/enderecoSlice";
import { toast } from "react-toastify";

import { enderecoFetch } from "../../../Features/enderecoSlice";

const Endereco = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const endereco = useSelector((state) => {
    return state.endereco;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* dispatch(enderecoFetch(auth.id)); */

  useEffect(() => {
    if (auth.id) {
      navigate("/endereco");
    }
  }, [auth.id, navigate]);

  //talvez melhorar o scripr de reload
  if(endereco.id === ""){
    dispatch(enderecoFetch(auth.id));
  }

/*   const [endereco, setEndereco] = useState({}); */

  const handleClickUpdate = async (e) => {
    console.log(e);
    
    console.log(endereco);
    //poder ter o update do endereco
    const endereco2 = {
      id: auth.id,
      cep: e.cep ? e.cep : endereco.cep,
      numero: e.numero ? e.numero : endereco.numero,
      bairro: e.bairro ? e.bairro : endereco.bairro,
      cidade: e.cidade ? e.cidade : endereco.cidade,
      estado: e.estado ? e.estado : endereco.estado,
    };

    console.log(endereco2);

    dispatch(updateEndereco(endereco2)).then((res) => {
      toast.success("update com sucesso");
    });
  };

  const validationEndereco = yup.object().shape({
    cep: yup.string().max(8, "Seu CEP deve ter 8 caracteres"),
    rua: yup.string().min(5, "Sua rua deve ter pelo menos 5 caracteres"),
    numero: yup.string().max(4, "Seu numero deve ter 4 digitos"),
    bairro: yup.string().min(5, "Seu bairro deve ter pelo menos 5 caracteres"),
    cidade: yup.string().min(5, "Sua cidade deve ter pelo menos 5 caracteres"),
    estado: yup.string().max(2, "Seu estado deve ter 2 caracteres"),
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

                      <p>{`${endereco.estado}, ${endereco.cidade}, ${endereco.cep}, ${endereco.bairro}, ${endereco.numero}`}</p>

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
