import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import {
  categoriasCreate,
  categoriasDelete,
  categoriasFetch,
} from "../../../Features/categoriasSlice";
import "./Categoria.css";
import { categories } from "../Transacoes/data/data";
import { DataGrid } from "@mui/x-data-grid";
import EditCategorias from "../../../Components/Edit/EditCategorias";

export const TodasCategorias = () => {
  const categorias = useSelector((state) => {
    return state.categorias;
  });

  const functionSeparator = (array) => {
    const objCategoria = {};
    array.categorias.map(
      (item) =>
        (objCategoria[item.nome] = {
          id: item.id,
          titulo: item.titulo,
          color: item.cor,
          expense: item.expense == "true" ? true : false,
        })
    );
    return { ...categories, ...objCategoria };
  };

  function objetoParaArray(objeto) {
    return Object.keys(objeto).map(function (chave) {
      return [chave, objeto[chave]];
    });
  }

  return objetoParaArray(functionSeparator(categorias));
};

const Categoria = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriasFetch(auth.id));
  }, [dispatch, auth.id]);

  const handleDelete = (id) => {
    dispatch(categoriasDelete(id));
  };

  const handleUpdate = (id) => {};

  const handleSubmit = (e) => {
    const categoria = {
      idUser: auth.id,
      nome: e.titulo,
      titulo: e.titulo[0].toUpperCase() + e.titulo.slice(1),
      cor: e.color,
      expense: e.expense,
    };

    dispatch(categoriasCreate(categoria)).then((e) => console.log(e));
  };

  const columns = [
    { field: "id", headerName: "id da categoria", width: 250 },
    { field: "titulo", headerName: "Nome da categoria", width: 250 },
    { field: "color", headerName: "Cor", width: 250 },
    { field: "expense", headerName: "Expense", width: 150 },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="actions">
            {params.row.id > 9 && (
              <button
                onClick={() => handleDelete(params.row.id)}
                className="delete"
              >
                Deletar
              </button>
            )}

            {params.row.id > 9 && (
              <EditCategorias categoriasId={params.row.id}></EditCategorias>
            )}
          </div>
        );
      },
    },
  ];

  const validationCategoria = yup.object().shape({
    titulo: yup
      .string()
      .min(4, "Sua categoria deve ter no minimo 4 caracteres")
      .required("Selecione uma opção"),
    color: yup
      .string()
      .min(5, "Sua cor deve ter pelo menos 5 caracteres")
      .required("Selecione uma opção"),
    expense: yup.string().required("Selecione uma opção"),
  });

  return (
    <div className="cartoes-container">
      <Navbar></Navbar>
      <div className="cartoes-container-direita">
        <Header></Header>

        <div className="cartoes-container-direita-cartoes">
          <h1>Adicionar Categoria</h1>

          <div className="OptionsConta--container--direita--mid--direita--infos--mid__inputs--categoria">
            <Formik
              initialValues={{}}
              onSubmit={handleSubmit}
              validationSchema={validationCategoria}
            >
              <Form className="OptionsConta-form-categoria">
                <div className="categoria-box">
                  <div>
                    <h2 className="input-name-form-categoria">Nome</h2>
                    <div className="OptionsConta-form-input">
                      <Field
                        name="titulo"
                        className="form-OptionsConta-categoria"
                        placeholder="Nome"
                        autoComplete="off"
                      ></Field>
                      <ErrorMessage
                        component="span"
                        name="titulo"
                        className="form-error-edit"
                      ></ErrorMessage>
                    </div>

                    <h2 className="input-name-form-categoria">Cor</h2>
                    <div className="OptionsConta-form-input">
                      <Field
                        name="color"
                        className="form-OptionsConta-categoria"
                        placeholder="color"
                        autoComplete="off"
                      ></Field>
                      <ErrorMessage
                        component="span"
                        name="color"
                        className="form-error-edit"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <div>
                    <h2 className="input-name-form-categoria">Tipo</h2>
                    <div className="OptionsConta-form-input">
                      <Field
                        name="expense"
                        className="form-OptionsConta-categoria"
                        placeholder="Expense"
                        autoComplete="off"
                        as="select"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="false">Receita</option>
                        <option value="true">Despesa</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="expense"
                        className="form-error-edit"
                      ></ErrorMessage>
                    </div>
                  </div>
                </div>
                <button className="button2--OptionsConta" type="submit">
                  Salvar
                </button>
              </Form>
            </Formik>
          </div>
        </div>

        <div className="cartoes-container-direita-listagem">
          <div className="container-table-listagem">
            <div className="table">
              <div
                style={{
                  height: "40vh",
                  width: "auto",
                  fontSize: "1.5rem",
                }}
              >
                <DataGrid
                  rows={TodasCategorias().map((item) => item[1])}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categoria;
