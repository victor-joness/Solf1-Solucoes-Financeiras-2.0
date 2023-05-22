import * as c from "./styles";
import { TableItem } from "../tableItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import {
  setTitle,
  setCategory,
  setCartao,
} from "../../redux/reducers/searchReducer";

export const TableArea = ({ list, deleteItem }) => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const theme = useAppSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [title, setTitleSearch] = useState("");
  const [category, setCategorySearch] = useState("");
  const [cartao, setCartaoSearch] = useState("");

  useEffect(() => {
    dispatch(setTitle(title));
    dispatch(setCategory(category));
    dispatch(setCartao(cartao));
  }, [title, category, cartao, auth.id]);

  return (
    <c.Container theme={theme}>
      <c.SearchArea theme={theme}>
        <input
          type="search"
          value={title}
          onChange={(e) => setTitleSearch(e.target.value)}
          placeholder="Qual o nome da operçao que deseja buscar?"
        />
        <select
          value={category}
          defaultValue={category}
          onChange={(e) => setCategorySearch(e.target.value)}
        >
          <option className="option" selected value={""}>
            Todos
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
        </select>
      </c.SearchArea>
      <c.Table>
        <thead>
          <tr>
            <c.TableHeadColumn width={100}>Data</c.TableHeadColumn>
            <c.TableHeadColumn width={130}>Categoria</c.TableHeadColumn>
            <c.TableHeadColumn width={400}>Título</c.TableHeadColumn>
            <c.TableHeadColumn>Cartão</c.TableHeadColumn>
            <c.TableHeadColumn width={130}>Valor</c.TableHeadColumn>
            <c.TableHeadColumn width={25}></c.TableHeadColumn>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item, index) => (
              <TableItem
                handleDeleteItem={deleteItem}
                key={index}
                item={item}
              />
            ))}
        </tbody>
      </c.Table>
    </c.Container>
  );
};
