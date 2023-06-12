import type { Item } from "../types/types"
import type { Category } from "../types/types"

export const items: Item[] = [
    {date: new Date(2022, 3, 1), category: 'salary', title: 'Sálario', cartao: "teste", value: 5000},
    {date: new Date(2022, 3, 1), category: 'food', title: 'Compras do mês',cartao: "teste", value: 500},
    {date: new Date(2022, 3, 1), category: 'rent', title: 'Aluguel',cartao: "teste", value: 1000},
    {date: new Date(2022, 3, 1), category: 'cloats', title: 'Roupas Novas',cartao: "teste", value: 500},
    {date: new Date(2022, 3, 1), category: 'profit', title: 'Dividendos',cartao: "teste", value: 750},
    {date: new Date(2022, 3, 1), category: 'velhice', title: 'Combustivel',cartao: "teste", value: 300},
    {date: new Date(2022, 3, 1), category: 'tax', title: 'Imposto de Renda',cartao: "teste", value: 750},
    {date: new Date(2022, 3, 1), category: 'investments', title: 'Acões',cartao: "teste", value: 2000},
    {date: new Date(2022, 3, 1), category: 'services', title: 'Conta de luz e água',cartao: "teste", value: 400}
];

export const categories: Category = {
    food: { id: 1,titulo: 'Alimentação', color: '#0000ff', expense: true },
    rent: { id: 2,titulo: 'Aluguel', color: '#ff0000', expense: true },
    cloats: { id: 3,titulo: 'Roupas', color: '#06d5f9', expense: true },
    salary: { id: 4,titulo: 'Salário', color: '#008000', expense: false },
    tax: {id: 5,titulo: 'Impostos', color: '#ff0000', expense: true },
    profit: {id: 6,titulo: 'Lucros', color: '#008000', expense: false },
    velhice: {id: 7,titulo: 'veiculos', color: '#ffff00', expense: true },
    investments: {id: 8,titulo: 'Investimentos', color: '#000080', expense: true },
    services: {id: 9,titulo: 'Serviços', color: '#ff6913', expense: true }
};