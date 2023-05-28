import * as c from './styles';
import { categories } from '../../data/data';
import { useAppSelector } from '../../redux/hooks/useAppSelector';

import {BiTrash, BiPencil} from "react-icons/bi";

import React from 'react';

import "./tableItem.css";
export const TableItem = ({ item, handleDeleteItem }) => {
    const searchItem = useAppSelector(state => state.searchItem);

    const formatedValue = (value) => {
        let fixedValue = value;
        let formatValue = parseFloat(fixedValue);
        return formatValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    const deleteItem = ({ id }) => {
        handleDeleteItem(id);
    };

    function converterData(data) {
        var partes = data.split("-"); // Divide a string nos separadores "-"
        var novaData = partes[2] + "-" + partes[1] + "-" + partes[0]; // Rearranja as partes da data
        return novaData;
      }

    return (
        <>
            {searchItem.titulo.length === 0 && searchItem.categoria.length === 0 &&
                <c.TableLine>
                    <c.TableColumn className='data'>{converterData((item.data).split('T')[0])}</c.TableColumn>
                    <c.TableColumn>
                        <c.Category color={categories[item.categoria].color} >
                            {categories[item.categoria].titulo}
                        </c.Category>
                    </c.TableColumn>
                    <c.TableColumn>{item.titulo}</c.TableColumn>
                    <c.TableColumn>{item.cartao}</c.TableColumn>
                    <c.TableColumn>
                        <c.Value color={categories[item.categoria].expense ? '#ff0000' : '#008000'}>
                            {formatedValue(item.valor)}
                        </c.Value>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div className='icon'>
                            <BiPencil size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div onClick={() => deleteItem(item)} className='icon'>
                            <BiTrash size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                </c.TableLine>
            } {item.titulo === searchItem.titulo && searchItem.categoria.length === 0 &&
                <c.TableLine>
                    <c.TableColumn className='data'>{converterData((item.data).split('T')[0])}</c.TableColumn>
                    <c.TableColumn>
                        <c.Category color={categories[item.categoria].color} >
                            {categories[item.categoria].titulo}
                        </c.Category>
                    </c.TableColumn>
                    <c.TableColumn>{item.titulo}</c.TableColumn>
                    <c.TableColumn>{item.cartao}</c.TableColumn>
                    <c.TableColumn>
                        <c.Value color={categories[item.categoria].expense ? '#ff0000' : '#008000'}>
                            {formatedValue(item.valor)}
                        </c.Value>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div className='icon'>
                            <BiPencil size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div onClick={() => deleteItem(item)} className='icon'>
                            <BiTrash size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                </c.TableLine>
            } {searchItem.categoria === item.categoria && searchItem.titulo.length === 0 &&
                <c.TableLine>
                    <c.TableColumn className='data'>{converterData((item.data).split('T')[0])}</c.TableColumn>
                    <c.TableColumn>
                        <c.Category color={categories[item.categoria].color} >
                            {categories[item.categoria].titulo}
                        </c.Category>
                    </c.TableColumn>
                    <c.TableColumn>{item.titulo}</c.TableColumn>
                    <c.TableColumn>{item.cartao}</c.TableColumn>
                    <c.TableColumn>
                        <c.Value color={categories[item.categoria].expense ? '#ff0000' : '#008000'}>
                            {formatedValue(item.valor)}
                        </c.Value>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div className='icon'>
                            <BiPencil size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div onClick={() => deleteItem(item)} className='icon'>
                            <BiTrash size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                </c.TableLine>
            } {searchItem.categoria === item.categoria && searchItem.titulo === item.titulo &&
                <c.TableLine>
                    <c.TableColumn className='data'>{converterData((item.data).split('T')[0])}</c.TableColumn>
                    <c.TableColumn>
                        <c.Category color={categories[item.categoria].color} >
                            {categories[item.categoria].titulo}
                        </c.Category>
                    </c.TableColumn>
                    <c.TableColumn>{item.titulo}</c.TableColumn>
                    <c.TableColumn>{item.cartao}</c.TableColumn>
                    <c.TableColumn>
                        <c.Value color={categories[item.categoria].expense ? '#ff0000' : '#008000'}>
                            {formatedValue(item.valor)}
                        </c.Value>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div className='icon'>
                            <BiPencil size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div onClick={() => deleteItem(item)} className='icon'>
                            <BiTrash size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                </c.TableLine>
            } {searchItem.cartao === item.cartao && searchItem.titulo === item.titulo &&
                <c.TableLine>
                    <c.TableColumn className='data'>{converterData((item.data).split('T')[0])}</c.TableColumn>
                    <c.TableColumn>
                        <c.Category color={categories[item.categoria].color} >
                            {categories[item.categoria].titulo}
                        </c.Category>
                    </c.TableColumn>
                    <c.TableColumn>{item.titulo}</c.TableColumn>
                    <c.TableColumn>{item.cartao}</c.TableColumn>
                    <c.TableColumn>
                        <c.Value color={categories[item.categoria].expense ? '#ff0000' : '#008000'}>
                            {formatedValue(item.valor)}
                        </c.Value>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div className='icon'>
                            <BiPencil size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                    <c.TableColumn>
                        <div onClick={() => deleteItem(item)} className='icon'>
                            <BiTrash size={25} weight="regular"/>
                        </div>
                    </c.TableColumn>
                </c.TableLine>
            }
        </>
    )
}

