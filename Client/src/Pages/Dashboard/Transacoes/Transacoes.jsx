import React, { useEffect, useState } from "react";
import "./Transacoes.css";

import Navbar from "../../../Components/Navbar/Navbar";

import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";

import UserContainer from "../../../Components/UserContainer/UserContainer";
import OptionsContainer from "../../../Components/OptionsContainer/OptionsContainer";
import NotFound from "../../NotFound/NotFound";

import { updateUser } from "../../../Features/authSlice";
import { toast } from "react-toastify";

const Transacoes = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  /* console.log(auth); */

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/transacoes");
    }
  }, [auth.id, navigate]);

  const [todastransacoesdousuario, setTodastransacoesdousuario] = useState([
    {
      id: "1",
      valor: "100",
      data: "15/05/2021",
      categoria: "teste2",
      descricao: "teste",
      tipo: "teste",
      status: "teste",
    },
    {
        id: "2",
        valor: "200",
        data: "16/05/2021",
        categoria: "teste2",
        descricao: "teste2",
        tipo: "teste2",
        status: "teste2",
      },
  ]);

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "valor", headerName: "Valor", width: 120 },
    { field: "descricao", headerName: "Descricao", width: 150 },
    { field: "data", headerName: "Data", width: 150 },
    { field: "categoria", headerName: "categoria", width: 150 },
    { field: "tipo", headerName: "Tipo", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleDelete(params.row.id)}
              className="delete"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(params.row.id)}
              className="update"
            >
              update
            </button>
          </div>
        );
      },
    },
  ];

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
                  <div className="OptionsConta--container--direita--mid__direita--infos">
                    <h1>Container que vai ter os input de transações</h1>
                  </div>

                  <div className="container-table-listagem">
                    <div className="table">
                      <div
                        style={{
                          height: "55vh",
                          width: "auto",
                          fontSize: "1.5rem",
                        }}
                      >
                        <DataGrid
                          rows={todastransacoesdousuario}
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
          </div>
          );
        </div>
      </div>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default Transacoes;
