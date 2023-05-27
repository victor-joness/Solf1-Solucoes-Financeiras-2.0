import * as c from "./app.styles";
import { TableArea } from "./components/tableArea";
import { InfoArea } from "./components/infoArea";
import { InputArea } from "./components/inputArea";
import { categories, items } from "./data/data";
import { useState, useEffect } from "react";
import { getCurrentMonth, FilterListByMonth } from "./helpers/dateFilter";
import { useAppSelector } from "./redux/hooks/useAppSelector";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import NotFound from "../../NotFound/NotFound";
import "./Transacoes.css";
import { transacaoCreate, transacoesFetch } from "../../../Features/transacoes";

const Transacoes = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const transacoes = useSelector((state) => {
    return state.transacoes;
  });

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
  console.log(searchItem);

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
    console.log(incomeCount);
  }, [filteredList, searchItem.titulo, searchItem.categoria]);

  console.log(list);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item) => {
    dispatch(transacaoCreate({ idUser: auth.id, ...item }));
    let newList = [...list];
    newList.push(item);
    setList(newList);
  };

  const handleDeleteItem = (titulo) => {
    let newlist = list.filter((item) => {
      if (item.titulo !== titulo) return item;
    });

    setList(newlist);
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
