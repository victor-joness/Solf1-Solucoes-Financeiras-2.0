import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransacao } from "../../Features/transacoes";
import { useNavigate } from "react-router-dom";

export default function EditTransacoes({ transacoesId }) {
  const cartoes = useSelector((state) => {
    return state.cartoes;
  });

  const categorias = useSelector((state) => {
    return state.categorias;
  });

  const navigate = useNavigate();

  const initData = {
    id: "",
    idUser: "",
    valor: "",
    titulo: "",
    data: "",
    expense: "",
    categoria: "",
    cartao: "",
  };

  const [TransacoesValue, setTransacoesValue] = useState(transacoesId);

  const HandleTransacoesChange = (e, k) => {
    setTransacoesValue({ ...TransacoesValue, [e]: k });
  };

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateTransacao({
        id: TransacoesValue.id,
        idUser: TransacoesValue.idUser,
        valor: TransacoesValue.valor,
        titulo: TransacoesValue.titulo,
        data: TransacoesValue.data,
        expense: TransacoesValue.expense,
        categoria: TransacoesValue.categoria,
        cartao: TransacoesValue.cartao,
      })
    ).then((res) => {
      if (res.payload.msg == "Transação atualizada com Sucesso") {
        handleClose();
        setTimeout(() => {
          navigate("/dashboard");
          setTimeout(() => {navigate("/transacoes")},"100")
        }, "500");
      }
    });
  };

  return (
    <div>
      <div className="edit" variant="outlined" onClick={handleClickOpen}>
        Editar
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Editar transação</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Id da transação</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Id"
                  name="id"
                  value={TransacoesValue.id}
                  disabled
                />
              </div>
            </div>

            <div>
              <label>Id do user</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="idUser"
                  name="idUser"
                  value={TransacoesValue.idUser}
                  disabled
                />
              </div>
            </div>

            <div>
              <label>Nome da Operação</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Titulo"
                  name="titulo"
                  value={TransacoesValue.titulo}
                  onChange={(e) =>
                    HandleTransacoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label>Data</label>
              <div className="inputdiv">
                <input
                  type="date"
                  name="data"
                  className="inputDate"
                  value={TransacoesValue.data}
                  onChange={(e) =>
                    HandleTransacoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label>Categoria</label>
              <div className="inputdiv">
                <select
                  name="categoria"
                  value={TransacoesValue.categoria}
                  onChange={(e) =>
                    HandleTransacoesChange(e.target.name, e.target.value)
                  }
                  required
                >
                  <option className="option" selected hidden value={""}>
                    Categoria
                  </option>
                  <option className="option" value={"salary"}>
                    Sálario
                  </option>
                  <option className="option" selected value={"food"}>
                    Alimentação
                  </option>
                  <option className="option" value={"rent"}>
                    Aluguel
                  </option>
                  <option className="option" selected value={"cloats"}>
                    Roupas
                  </option>
                  <option className="option" value={"profit"}>
                    Lucros e dividendos
                  </option>
                  <option className="option" selected value={"velhice"}>
                    Veiculos
                  </option>
                  <option className="option" value={"tax"}>
                    Impostos e tributos
                  </option>
                  <option className="option" selected value={"investments"}>
                    Investimentos
                  </option>
                  <option className="option" value={"services"}>
                    Serviços
                  </option>
                  {categorias.categorias.map((categoria) => {
                    return (
                      <option key={categoria.id} value={categoria.nome}>
                        {<p>{categoria.titulo}</p>}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label>Cartão</label>
              <div className="inputdiv">
                <select
                  name="cartao"
                  value={TransacoesValue.cartao}
                  onChange={(e) =>
                    HandleTransacoesChange(e.target.name, e.target.value)
                  }
                  disabled
                >
                  <option className="option" value="">
                    Escolher Cartao
                  </option>
                  {cartoes.cartoes.map((cartao) => {
                    return (
                      <option
                        key={cartao.id}
                        value={[cartao.id, cartao.cartoesTipo]}
                      >
                        {
                          <p>
                            id:{cartao.id}, tipo: {cartao.cartoesTipo}
                          </p>
                        }
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label>Valor</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Valor da transação"
                  name="valor"
                  value={TransacoesValue.valor}
                  onChange={(e) =>
                    HandleTransacoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <button type="submit" className="formsubmitbutton">
              {loading ? "Loading..." : "Editar"}
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
