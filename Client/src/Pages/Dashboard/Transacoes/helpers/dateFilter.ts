import { Item } from "../types/types";

export const getCurrentMonth = () => {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

export const FilterListByMonth = (list: Item[], date: string) => {
    console.log(list);
    console.log(date);
    let newList: Item[] = [];
    let [year, month] = date.split('-')
    for (let i in list) {
        let data = new Date(list[i].data)
       if (data.getFullYear() === parseInt(year) &&
       (data.getMonth() + 1) === parseInt(month)
       ) {
            newList.push(list[i]);
       }
    }

    return newList;
};

export const formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();

    return `${addZeroToDate(day)}/${addZeroToDate(month)}/${addZeroToDate(year)}`;
}  

const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}` 

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${months[parseInt(month) - 1]} de ${year}`;
}


