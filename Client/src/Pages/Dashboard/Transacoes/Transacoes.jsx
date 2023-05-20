import * as c from './app.styles'
import { TableArea } from './components/tableArea';
import { InfoArea } from './components/infoArea';
import { InputArea } from './components/inputArea';
import { categories, items } from './data/data';
import { useState, useEffect } from 'react';
import { getCurrentMonth, FilterListByMonth } from './helpers/dateFilter';
import { ThemeSwitcher } from './components/themeSwitcher';
import { useAppSelector } from './redux/hooks/useAppSelector';
import { useSelector } from 'react-redux';

const Transacoes = () => {  
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, SetIncome] = useState(0);
  const [expense, SetExpense] = useState(0);

  const theme = useAppSelector(state => state.theme);
  const searchItem = useSelector(state => state.searchItem);

  useEffect(() => {
    setFilteredList(FilterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  console.log(searchItem);

  useEffect(() => {
    let  incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (searchItem.title === filteredList[i].title && searchItem.category === filteredList[i].category) {
        if (categories[filteredList[i].category].expense) {
          expenseCount += filteredList[i].value;
        } else {
          incomeCount += filteredList[i].value;
        } 
      } else if (searchItem.title === filteredList[i].title) {
        if (categories[filteredList[i].category].expense) {
          expenseCount += filteredList[i].value;
        } else {
          incomeCount += filteredList[i].value;
        } 
      } else if (searchItem.category === filteredList[i].category) {
        if (categories[filteredList[i].category].expense) {
          expenseCount += filteredList[i].value;
        } else {
          incomeCount += filteredList[i].value;
        } 
      } else if (searchItem.category === '' && searchItem.title === '') {
        if (categories[filteredList[i].category].expense) {
          expenseCount += filteredList[i].value;
        } else {
          incomeCount += filteredList[i].value;
        }
      } 
    }
    
    SetIncome(incomeCount);
    SetExpense(expenseCount);

  }, [filteredList, searchItem.title, searchItem.category]);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList)
  };

  const handleDeleteItem = (title) => {

    let newlist = list.filter((item) => {
      if (item.title !== title)
        return item;
    });

    setList(newlist);
  }

  return (
    <c.Container theme={theme}>
      <c.Header theme={theme}>
        <c.HeaderArea>
          <c.HeaderText>Gestor de Finanças</c.HeaderText>
          <ThemeSwitcher />
        </c.HeaderArea>
      </c.Header>
      <c.Body>
        <InfoArea income={income} expense={expense} onMonthChange={handleMonthChange} currentMonth={currentMonth} />
        <InputArea onAdd={handleAddItem} />
        <TableArea deleteItem={handleDeleteItem} list={filteredList} />
      </c.Body>
    </c.Container>
  )
}
export default Transacoes;