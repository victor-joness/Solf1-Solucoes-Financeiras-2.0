import * as c from "./styles";
import { useAppSelector } from "../../redux/hooks/useAppSelector";

import { BiTrash, BiPencil } from "react-icons/bi";

import React from "react";

import { TodasCategorias } from "../../../Categoria/Categoria";

import "./tableItem.css";

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

export const TableItem = ({ item, handleDeleteItem }) => {
  const searchItem = useAppSelector((state) => state.searchItem);

  const formatedValue = (value) => {
    let fixedValue = value;
    let formatValue = parseFloat(fixedValue);
    return formatValue.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const deleteItem = ({ id }) => {
    handleDeleteItem(id);
  };

  function converterData(data) {
    var partes = data.split("-"); // Divide a string nos separadores "-"
    var novaData = partes[2] + "-" + partes[1] + "-" + partes[0]; // Rearranja as partes da data
    return novaData;
  }

  const categories = transformarDados();

  return (
    <>
      {searchItem.titulo.length === 0 && searchItem.categoria.length === 0 && (
        <c.TableLine>
          <c.TableColumn className="data">
            {converterData(item.data.split("T")[0])}
          </c.TableColumn>
          <c.TableColumn>
            <c.Category color={categories[item.categoria].color}>
              {categories[item.categoria].titulo}
            </c.Category>
          </c.TableColumn>
          <c.TableColumn>{item.titulo}</c.TableColumn>
          <c.TableColumn>{item.cartao}</c.TableColumn>
          <c.TableColumn>
            <c.Value
              color={categories[item.categoria].expense ? "#ff0000" : "#008000"}
            >
              {formatedValue(item.valor)}
            </c.Value>
          </c.TableColumn>
          <c.TableColumn>
            <div className="icon">
              <BiPencil size={25} weight="regular" />
            </div>
          </c.TableColumn>
          <c.TableColumn>
            <div onClick={() => deleteItem(item)} className="icon">
              <BiTrash size={25} weight="regular" />
            </div>
          </c.TableColumn>
        </c.TableLine>
      )}{" "}
      {item.titulo === searchItem.titulo &&
        searchItem.categoria.length === 0 && (
          <c.TableLine>
            <c.TableColumn className="data">
              {converterData(item.data.split("T")[0])}
            </c.TableColumn>
            <c.TableColumn>
              <c.Category color={categories[item.categoria].color}>
                {categories[item.categoria].titulo}
              </c.Category>
            </c.TableColumn>
            <c.TableColumn>{item.titulo}</c.TableColumn>
            <c.TableColumn>{item.cartao}</c.TableColumn>
            <c.TableColumn>
              <c.Value
                color={
                  categories[item.categoria].expense ? "#ff0000" : "#008000"
                }
              >
                {formatedValue(item.valor)}
              </c.Value>
            </c.TableColumn>
            <c.TableColumn>
              <div className="icon">
                <BiPencil size={25} weight="regular" />
              </div>
            </c.TableColumn>
            <c.TableColumn>
              <div onClick={() => deleteItem(item)} className="icon">
                <BiTrash size={25} weight="regular" />
              </div>
            </c.TableColumn>
          </c.TableLine>
        )}{" "}
      {searchItem.categoria === item.categoria &&
        searchItem.titulo.length === 0 && (
          <c.TableLine>
            <c.TableColumn className="data">
              {converterData(item.data.split("T")[0])}
            </c.TableColumn>
            <c.TableColumn>
              <c.Category color={categories[item.categoria].color}>
                {categories[item.categoria].titulo}
              </c.Category>
            </c.TableColumn>
            <c.TableColumn>{item.titulo}</c.TableColumn>
            <c.TableColumn>{item.cartao}</c.TableColumn>
            <c.TableColumn>
              <c.Value
                color={
                  categories[item.categoria].expense ? "#ff0000" : "#008000"
                }
              >
                {formatedValue(item.valor)}
              </c.Value>
            </c.TableColumn>
            <c.TableColumn>
              <div className="icon">
                <BiPencil size={25} weight="regular" />
              </div>
            </c.TableColumn>
            <c.TableColumn>
              <div onClick={() => deleteItem(item)} className="icon">
                <BiTrash size={25} weight="regular" />
              </div>
            </c.TableColumn>
          </c.TableLine>
        )}{" "}
      {searchItem.categoria === item.categoria &&
        searchItem.titulo === item.titulo && (
          <c.TableLine>
            <c.TableColumn className="data">
              {converterData(item.data.split("T")[0])}
            </c.TableColumn>
            <c.TableColumn>
              <c.Category color={categories[item.categoria].color}>
                {categories[item.categoria].titulo}
              </c.Category>
            </c.TableColumn>
            <c.TableColumn>{item.titulo}</c.TableColumn>
            <c.TableColumn>{item.cartao}</c.TableColumn>
            <c.TableColumn>
              <c.Value
                color={
                  categories[item.categoria].expense ? "#ff0000" : "#008000"
                }
              >
                {formatedValue(item.valor)}
              </c.Value>
            </c.TableColumn>
            <c.TableColumn>
              <div className="icon">
                <BiPencil size={25} weight="regular" />
              </div>
            </c.TableColumn>
            <c.TableColumn>
              <div onClick={() => deleteItem(item)} className="icon">
                <BiTrash size={25} weight="regular" />
              </div>
            </c.TableColumn>
          </c.TableLine>
        )}{" "}
      {searchItem.cartao === item.cartao &&
        searchItem.titulo === item.titulo && (
          <c.TableLine>
            <c.TableColumn className="data">
              {converterData(item.data.split("T")[0])}
            </c.TableColumn>
            <c.TableColumn>
              <c.Category color={categories[item.categoria].color}>
                {categories[item.categoria].titulo}
              </c.Category>
            </c.TableColumn>
            <c.TableColumn>{item.titulo}</c.TableColumn>
            <c.TableColumn>{item.cartao}</c.TableColumn>
            <c.TableColumn>
              <c.Value
                color={
                  categories[item.categoria].expense ? "#ff0000" : "#008000"
                }
              >
                {formatedValue(item.valor)}
              </c.Value>
            </c.TableColumn>
            <c.TableColumn>
              <div className="icon">
                <BiPencil size={25} weight="regular" />
              </div>
            </c.TableColumn>
            <c.TableColumn>
              <div onClick={() => deleteItem(item)} className="icon">
                <BiTrash size={25} weight="regular" />
              </div>
            </c.TableColumn>
          </c.TableLine>
        )}
    </>
  );
};
