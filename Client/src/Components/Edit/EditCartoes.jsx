import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartoes } from "../../Features/cartoesSlice";

export default function EditCartoes({ cartoesId }) {
  const { cartoes: cartoes } = useSelector((state) => state.cartoes);

  const initData = {
    cartoesCodigo: "",
    cartoesLimite: "",
    cartoesNome : "" ,
    cartoesNumero: "",
    cartoesTipo: "",
    cartoesUser: "",
    cardExpMM: "",
    cardExpYY: "",
    id: ""
  };

  let selectedCartoes = cartoes.filter((item) => item.id === cartoesId)[0];

  const [CartaoValue, setCartaoValue] = useState(selectedCartoes);

  const HandleCartoesChange = (e, k) => {
    setCartaoValue({ ...CartaoValue, [e]: k });
  };

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);

    console.log(CartaoValue);
    console.log(selectedCartoes);
    console.log(initData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //falta lançar o dispatch pra atualizar um cartao no banco de dados

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(CartaoValue);

    /* dispatch(
      updateCartoes({
        cartoesCodigo: CartaoValue.cartoesCodigo,
        cartoesLimite: CartaoValue.cartoesLimite,
        cartoesNome : CartaoValue.cartoesNome ,
        cartoesNumero: CartaoValue.cartoesNumero,
        cartoesTipo: CartaoValue.cartoesTipo,
        cartoesUser: CartaoValue.cartoesUser,
        cardExpMM: CartaoValue.cardExpMM,
        cardExpYY: CartaoValue.cardExpYY,
        id: CartaoValue.id
      })
    ).then((res) => {
      if (res.payload.msg == "mudaça feita com sucesso") {
        handleClose();
        setTimeout(() => {
          window.location.reload(false);
        }, "1000");
      }
    }); */
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
        <DialogTitle>Editar Cartao</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome do Dono</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  name="cartoesNome"
                  value={CartaoValue.cartoesNome}
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Número Do Cartão</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="1234 5678 9123 0000"
                  autoComplete="cc-number"
                  maxLength="19"
                  name="cartoesNumero"
                  value={CartaoValue.cartoesNumero}
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Mês De Validade</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Mês De Validade"
                  name="cardExpMM"
                  value={CartaoValue.cardExpMM}
                  min={1}
                  max={12}
                  maxLength={2}
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Ano De Validade</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Ano De Validade"
                  name="cardExpYY"
                  value={CartaoValue.cardExpYY}
                  min={23}
                  max={99}
                  maxLength="2"
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Tipo</label>
              <div className="inputdiv">
                <select
                  name="cartoesTipo"
                  value={CartaoValue.cartoesTipo}
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
                  }
                  required
                >
                  <option value="Choose Gender">Escolher Tipo</option>
                  <option value="Credito">Credito</option>
                  <option value="Debito">Debito</option>
                </select>
              </div>
            </div>
            <div>
              <label>Limite do cartão</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Limite do cartão"
                  name="cartoesLimite"
                  maxLength={5}
                  max={99999}
                  value={CartaoValue.cartoesLimite}
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>CVC</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="CVC"
                  name="cartoesCodigo"
                  maxLength={3}
                  max={999}
                  value={CartaoValue.cartoesCodigo}
                  onChange={(e) =>
                    HandleCartoesChange(e.target.name, e.target.value)
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
