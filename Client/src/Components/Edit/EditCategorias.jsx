import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriasUpdate } from "../../Features/categoriasSlice";

export default function EditCategorias({ categoriasId }) {
  const { categorias: categorias } = useSelector((state) => state.categorias);

  const initData = {
    id: "",
    idUser: "",
    nome: "",
    titulo: "",
    cor: "",
    expense: "",
  };

  let selectedCategorias = categorias.filter(
    (item) => item.id === categoriasId
  )[0];

  const [CategoriasValue, setCategoriasValue] = useState(selectedCategorias);

  const HandleCategoriasChange = (e, k) => {
    setCategoriasValue({ ...CategoriasValue, [e]: k });
  };

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);

    console.log(CategoriasValue);
    console.log(selectedCategorias);
    console.log(initData);
  };

  const handleClose = () => {
    console.log(CategoriasValue);
    setOpen(false);
  };

  //falta lançar o dispatch pra atualizar um cartao no banco de dados

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(CategoriasValue);

    dispatch(
      categoriasUpdate({
        id: CategoriasValue.id,
        idUser: CategoriasValue.idUser,
        nome: CategoriasValue.nome,
        titulo: CategoriasValue.nome[0].toUpperCase() + CategoriasValue.nome.slice(1),
        cor: CategoriasValue.cor,
        expense: CategoriasValue.expense,
      })
    ).then((res) => {
      if (res.payload.msg == "Categoria atualizada com Sucesso") {
        handleClose();
        setTimeout(() => {
          window.location.reload(false);
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
        <DialogTitle>Editar Categoria</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Id da categoria</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Id"
                  name="id"
                  value={CategoriasValue.id}
                  disabled
                />
              </div>
            </div>
            <div>
              <label>Id do User</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="idUser"
                  name="idUser"
                  value={CategoriasValue.idUser}
                  disabled
                />
              </div>
            </div>
            <div>
              <label>Nome da categoria</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  name="nome"
                  value={CategoriasValue.nome}
                  onChange={(e) =>
                    HandleCategoriasChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Cor da categoria</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Cor em Hexadecimal"
                  name="cor"
                  value={CategoriasValue.cor}
                  onChange={(e) =>
                    HandleCategoriasChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label>Tipo</label>
              <div className="inputdiv">
                <select
                  name="expense"
                  value={CategoriasValue.expense}
                  onChange={(e) =>
                    HandleCategoriasChange(e.target.name, e.target.value)
                  }
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="false">Receita</option>
                  <option value="true">Despesa</option>
                </select>
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
