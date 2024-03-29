import React, { useEffect, useState } from "react";

import "./Cartoes.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartoesCreate, cartoesFetch,cartoesDelete } from "../../../Features/cartoesSlice";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import EditCartoes from "../../../Components/Edit/EditCartoes";

import { DataGrid } from "@mui/x-data-grid";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Form({
  setCardNumber,
  setCardBandeira,
  setCardName,
  setCardTipo,
  setCardLimite,
  setCardExpMM,
  setCardExpYY,
  setCVC,
  cartao,
}) {
  function animateName(name) {
    let length = name.length;
    let tempStr = alphabet.slice(0, length - 1);
    for (let i = 0; i < 10; i++) {
      setCardName(tempStr.join(""));
      shuffle(tempStr);
    }
    setTimeout(() => {
      setCardName(name);
    }, 1000);
  }

  const dispatch = useDispatch();

  const auth = useSelector((state) => {
    return state.auth;
  });

  const submitCartao = (cartao) => {
    const CARTAO = {...cartao, cartoesUser: auth.id}

    console.log(CARTAO);

    dispatch(cartoesCreate(CARTAO)).then((res) => {
      console.log(res);
    });
  }

  return (
    <form className="form-container-cartoes" name="cc-info-form">
      <div className="form-item-container-esquerda">
        {/*Item 1*/}
        <div className="form-item">
          <label htmlFor="cc-name">Nome do Dono</label>
          <div className="input-border">
            <input
              className="form-input"
              placeholder="e.g. Victor Mesquita"
              type="text"
              name="cc-name"
              id="cc-name"
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setCardName("Victor Mesquita");
                } else {
                  animateName(e.target.value);
                }
              }}
            />
          </div>
        </div>
        {/*End Item 1*/}

        {/*Item 2*/}
        <div className="form-item">
          <label htmlFor="cc-number">Número do cartão</label>
          <div className="input-border">
            <input
              className="form-input"
              type="text"
              pattern="[0-9\.]+"
              autoComplete="cc-number"
              maxLength="19"
              name="cc-number"
              id="cc-number"
              placeholder="e.g. 1234 5678 9123 0000"
              onChange={(e) => {
                let len = e.target.value.replace(/\s/g, "").length;

                if (len > 0) {
                  if (len % 4 === 0) {
                    e.target.value += " ";
                  }
                }
                if (e.target.value.trim().length === 0) {
                  setCardNumber("0000 0000 0000 0000");
                } else {
                  setCardNumber(e.target.value.trim());
                }
              }}
            />
          </div>
        </div>
        {/*End Item 2*/}

        <div>
          {/*Item 3*/}
          <div className="form-item">
            <span>
              Exp. Date (<label htmlFor="exp-month"> MM </label> /
              <label htmlFor="exp-year">YY</label>)
            </span>
            <div className="exp-inputs">
              <div className="input-border border-m">
                <input
                  className="form-input"
                  type="text"
                  name="exp-month"
                  id="exp-month"
                  maxLength="2"
                  placeholder="MM"
                  onChange={(e) => {
                    if (e.target.value.trim().length === 0) {
                      setCardExpMM("00/");
                    } else {
                      setCardExpMM(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="input-border">
                <input
                  className="form-input"
                  type="text"
                  name="exp-year"
                  id="exp-year"
                  maxLength="2"
                  placeholder="YY"
                  onChange={(e) => {
                    if (e.target.value.trim().length === 0) {
                      setCardExpYY("00");
                    } else {
                      setCardExpYY(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {/*End Item 3*/}

          {/*Item 4*/}
          <div className="form-item">
            <label htmlFor="cvc">CVC</label>
            <div className="input-border">
              <input
                className="form-input"
                type="text"
                name="cvc"
                id="cvc"
                maxLength="3"
                placeholder="e.g. 123"
                onChange={(e) => {
                  if (e.target.value.trim().length === 0) {
                    setCVC("000");
                  } else {
                    setCVC(e.target.value);
                  }
                }}
              />
            </div>
          </div>
          {/*End Item 4*/}
        </div>
      </div>

      <div className="form-item-container-direita">
        {/*Item 1*/}
        <div className="form-item">
          <label htmlFor="cc-tipo">Tipo de Cartão</label>
          <div className="input-border">
            <div id="alvo">
              <select
                className="form-input-select"
                name="opcoes"
                id="select"
                onChange={(e) => setCardTipo(e.target.value)}
              >
                <option value="Credito">Crédito</option>
                <option value="Debito">Débito</option>
              </select>
            </div>
          </div>
        </div>
        {/*End Item 1*/}

        {/*Item 1*/}
        <div className="form-item">
          <label htmlFor="cc-limite">Limite de Cartão</label>
          <div className="input-border">
            <input
              className="form-input"
              placeholder="e.g. 1000"
              type="text"
              name="cc-limite"
              maxLength="5"
              pattern="[0-9\.]+"
              id="cc-limite"
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setCardLimite("1000");
                } else {
                  setCardLimite(e.target.value);
                }
              }}
            />
          </div>
        </div>
        {/*End Item 1*/}

        <button
          className="submit-button"
          onClick={(e) => {
            e.preventDefault();
            submitCartao(cartao);
          }}
        >
          Confirm
        </button>
      </div>

      <div className="form-item-container-direita-part2">
        {/*Item 1*/}
        <div className="form-item">
          <label htmlFor="cc-bandeira">bandeira</label>
          <div className="input-border">
            <input
              className="form-input"
              placeholder="Master-card"
              type="text"
              name="cc-bandeira"
              id="cc-bandeira"
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setCardBandeira("Master-card");
                }else {
                  setCardBandeira(e.target.value);
                }
              }}
            />
          </div>
        </div>
        {/*End Item 1*/}
      </div>
    </form>
  );
}

const Cartoes = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const cartoes = useSelector((state) => {
    return state.cartoes;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      dispatch(cartoesFetch(auth.id)).then((res) => {
        return 0;
      });
    }
  }, [auth.id, dispatch, cartoesFetch]);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/cartoes");
    }
  }, [auth.id, navigate]);

  const [cardNumber, setCardNumber] = React.useState("0000 0000 0000 0000");

  const [cardName, setCardName] = React.useState("Jane Appleseed");
  const [cardTipo, setCardTipo] = React.useState("credito");
  const [cardExpMM, setCardExpMM] = React.useState("00/");
  const [cardExpYY, setCardExpYY] = React.useState("00");
  const [cardLimite, setCardLimite] = React.useState("1000");
  const [cardBandeira, setCardBandeira] = React.useState("Master-card");

  const [cvc, setCVC] = React.useState("000");

  const cartao = {
    cardNumber: cardNumber,
    cardName: cardName,
    cardTipo: cardTipo,
    cardExpMM: cardExpMM,
    cardExpYY: cardExpYY,
    cardLimite: cardLimite,
    cardBandeira: cardBandeira,
    cvc: cvc,
  };

  /* const [todascartoesdousuario, setTodascartoesdousuario] = useState([
    {
      id: "1",
      cartoesUser: "15",
      cartoesNome: "Victor teste",
      cartoesNumero: "3489472347",
      cartoesTipo: "Debito",
      cartoesValidade: "01/24",
      cartoesLimite: "2000",
    },
    {
      id: "2",
      cartoesUser: "20",
      cartoesNome: "Victor teste2",
      cartoesNumero: "3489472347",
      cartoesTipo: "Credito",
      cartoesValidade: "01/24",
      cartoesLimite: "4000",
    },
  ]); */

  const handleDelete = (id) => {
    dispatch(cartoesDelete(id));
  };

  const handleUpdate = (id) => {};

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "cartoesUser", headerName: "ID do User", width: 120 },
    { field: "cartoesNome", headerName: "Nome do Dono", width: 220 },
    { field: "cartoesNumero", headerName: "Número", width: 250 },
    { field: "cartoesTipo", headerName: "Tipo", width: 150 },
    { field: "cartoesValidade", headerName: "Validade", width: 100 },
    { field: "cartoesLimite", headerName: "Limite", width: 100 },
    { field: "cartoesValoratual", headerName: "Valor Atual", width: 150 },
    { field: "cartoesBandeira", headerName: "Bandeira", width: 150 },
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
              Deletar
            </button>

            <EditCartoes cartoesId={params.row.id}></EditCartoes>
          </div>
        );
      },
    },
  ];

  return (
    <div className="cartoes-container">
      <Navbar></Navbar>
      <div className="cartoes-container-direita">
        <Header></Header>

        <div className="cartoes-container-direita-cartoes">
          <h1>Adicionar Cartões</h1>
          <div className="global-container">
            <div className="cards">
              <div className="card-front">
                <img
                  className="card-logo"
                  src="https://i.ibb.co/wYPDjyL/card-logo.png"
                  alt="card-logo"
                  border="0"
                />
                <div className="details">
                  <div className="higher-details">
                    <p className="card-number">{cardNumber}</p>
                  </div>
                  <div className="lower-details">
                    <p className="card-name">Name : {cardName}</p>
                    <p className="card-type">Tipo : {cardTipo}</p>
                    <p className="card-exp">
                      Validade : {cardExpMM + "/" + cardExpYY}
                    </p>
                    <p className="card-limite">Limite : {cardLimite}</p>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <p className="cvc">{cvc}</p>
              </div>
            </div>
            <Form
              setCardNumber={setCardNumber}
              setCardName={setCardName}
              setCardTipo={setCardTipo}
              setCardLimite={setCardLimite}
              setCardExpMM={setCardExpMM}
              setCardExpYY={setCardExpYY}
              setCardBandeira={setCardBandeira}
              setCVC={setCVC}
              cartao={cartao}
            />
          </div>
        </div>

        <div className="cartoes-container-direita-listagem">
          <div className="container-table-listagem">
            <div className="table">
              <div
                style={{
                  height: "59vh",
                  width: "auto",
                  fontSize: "1.5rem",
                }}
              >
                <DataGrid
                  rows={cartoes.cartoes}
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

export default Cartoes;
