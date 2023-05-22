import { Item } from "../../types/types";
import { useState } from "react";
import * as c from "./styles";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [cartao, setCartao] = useState("");

  const cartoes = useSelector((state: any) => {
    return state.cartoes;
  });

  const theme = useAppSelector((state) => state.theme);

  const handleAddEvent = () => {
    let newItem = {
      data: new Date(date),
      category: category,
      title: title,
      value: parseInt(value),
      cartao: cartao,
    };
    setCartao("");
    setCategory("");
    setTitle("");
    setValue("");
    setDate("");
    onAdd(newItem);
  };

  return (
    <c.Container theme={theme}>
      <input
        type="search"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="inputText"
        placeholder="Digite o nome da operação que você deseja adicionar"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="inputNumber"
        placeholder="Valor da operação"
      />
      <input
        type="date"
        className="inputDate"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        value={category}
        defaultValue={category}
        onChange={(e) => setCategory(e.target.value)}
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
      </select>
      <select
        value={cartao}
        defaultValue={cartao}
        onChange={(e) => setCartao(e.target.value)}
      >
        <option className="option" value="">
          Escolher Cartao
        </option>
        {cartoes.cartoes.map((cartao: any) => {
          return (
            <option key={cartao.id} value={[cartao.id, cartao.cartoesTipo]}>
              {
                <p>
                  id:{cartao.id}, tipo: {cartao.cartoesTipo}
                </p>
              }
            </option>
          );
        })}
      </select>
      <button onClick={handleAddEvent}>Adicionar</button>
    </c.Container>
  );
};
