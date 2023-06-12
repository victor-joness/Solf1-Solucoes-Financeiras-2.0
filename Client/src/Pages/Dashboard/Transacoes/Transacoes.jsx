import * as c from "./app.styles";
import { TableArea } from "./components/tableArea";
import { InfoArea } from "./components/infoArea";
import { InputArea } from "./components/inputArea";
import { items } from "./data/data";
import { useState, useEffect } from "react";
import { getCurrentMonth, FilterListByMonth } from "./helpers/dateFilter";
import { useAppSelector } from "./redux/hooks/useAppSelector";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import NotFound from "../../NotFound/NotFound";
import "./Transacoes.css";
import {
  transacaoCreate,
  transacoesFetch,
  transacoesCartoesUpdate,
  transacoesDelete,
} from "../../../Features/transacoes";
import { toast } from "react-toastify";

import { TodasCategorias } from "../Categoria/Categoria";

function transformarDados() {
  const dados = TodasCategorias();

  const resultado = {};

  for (let i = 0; i < dados.length; i++) {
    const chave = dados[i][0];
    const valor = dados[i][1];

    switch (chave) {
      case "food":
        resultado[chave] = {
          id: 1,
          titulo: "Alimentação",
          color: "#0000ff",
          expense: true,
        };
        break;
      case "rent":
        resultado[chave] = {
          id: 2,
          titulo: "Aluguel",
          color: "#ff0000",
          expense: true,
        };
        break;
      case "cloats":
        resultado[chave] = {
          id: 3,
          titulo: "Roupas",
          color: "#06d5f9",
          expense: true,
        };
        break;
      case "salary":
        resultado[chave] = {
          id: 4,
          titulo: "Salário",
          color: "#008000",
          expense: false,
        };
        break;
      case "tax":
        resultado[chave] = {
          id: 5,
          titulo: "Impostos",
          color: "#ff0040",
          expense: true,
        };
        break;
      case "profit":
        resultado[chave] = {
          id: 6,
          titulo: "Lucros",
          color: "#008000",
          expense: false,
        };
        break;
      case "velhice":
        resultado[chave] = {
          id: 7,
          titulo: "veiculos",
          color: "#ffff00",
          expense: true,
        };
        break;
      case "investments":
        resultado[chave] = {
          id: 8,
          titulo: "Investimentos",
          color: "#000080",
          expense: true,
        };
        break;
      case "services":
        resultado[chave] = {
          id: 9,
          titulo: "Serviços",
          color: "#ff6913",
          expense: true,
        };
        break;
      default:
        resultado[chave] = valor;
        break;
    }
  }

  return resultado;
}

const Transacoes = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const categories = transformarDados();

  const transacoes = useSelector((state) => {
    return state.transacoes;
  });

  console.log(transacoes.transacoes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transacoesFetch(auth.id));
  }, [dispatch, auth.id]);

  const [list, setList] = useState(transacoes.transacoes);
  const [filteredList, setFilteredList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, SetIncome] = useState(0);
  const [expense, SetExpense] = useState(0);

  const theme = useAppSelector((state) => state.theme);
  const searchItem = useSelector((state) => state.searchItem);

  useEffect(() => {
    setFilteredList(FilterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  console.log(filteredList);

  useEffect(() => {
    setList(transacoes.transacoes);
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (
        searchItem.titulo === filteredList[i].titulo &&
        searchItem.categoria === filteredList[i].categoria
      ) {
        if (categories[filteredList[i].categoria].expense) {
          expenseCount += filteredList[i].valor;
        } else {
          incomeCount += filteredList[i].valor;
        }
      } else if (searchItem.titulo === filteredList[i].titulo) {
        if (categories[filteredList[i].categoria].expense) {
          expenseCount += filteredList[i].valor;
        } else {
          incomeCount += filteredList[i].valor;
        }
      } else if (searchItem.categoria === filteredList[i].categoria) {
        if (categories[filteredList[i].categoria].expense) {
          expenseCount += filteredList[i].valor;
        } else {
          incomeCount += filteredList[i].valor;
        }
      } else if (searchItem.categoria === "" && searchItem.titulo === "") {
        if (categories[filteredList[i].categoria].expense) {
          expenseCount += filteredList[i].valor;
        } else {
          incomeCount += filteredList[i].valor;
        }
      }
    }

    SetIncome(incomeCount);
    SetExpense(expenseCount);
  }, [filteredList, searchItem.titulo, searchItem.categoria]);

  console.log(list);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item) => {
    if (item.category == "profit" || item.category == "salary") {
      dispatch(transacaoCreate({ idUser: auth.id, ...item }));
      let newList = [...list];
      newList.push(item);
      setList(newList);
    } else if (item.cartao != "") {
      dispatch(transacoesCartoesUpdate(item)).then((e) => {
        if (e.payload.msg == "Limite do cartão excedido!") {
          toast.error(e.payload.msg);
        } else {
          dispatch(transacaoCreate({ idUser: auth.id, ...item }));
          let newList = [...list];
          newList.push(item);
          setList(newList);
        }
      });
    } else {
      dispatch(transacaoCreate({ idUser: auth.id, ...item }));
      let newList = [...list];
      newList.push(item);
      setList(newList);
    }
  };

  const handleDeleteItem = (id) => {
    console.log(id);
    dispatch(transacoesDelete(id)).then((e) => {
      let newlist = list.filter((item) => {
        if (item.id !== id) return item;
      });

      setList(newlist);
    });
  };

  if (auth.token) {
    return (
      <div className="container-dashboard">
        <Navbar></Navbar>
        <div className="container-direita-dashboard">
          <Header></Header>

          <div className="container-direita-center">
            <c.Container theme={theme}>
              <c.Header theme={theme}>
                <c.HeaderArea>
                  <c.HeaderText>Transações</c.HeaderText>
                  {/* <ThemeSwitcher /> */}
                </c.HeaderArea>
              </c.Header>
              <c.Body>
                <InfoArea
                  income={income}
                  expense={expense}
                  onMonthChange={handleMonthChange}
                  currentMonth={currentMonth}
                />
                <InputArea onAdd={handleAddItem} />
                <TableArea deleteItem={handleDeleteItem} list={filteredList} />
              </c.Body>
            </c.Container>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};
export default Transacoes;
