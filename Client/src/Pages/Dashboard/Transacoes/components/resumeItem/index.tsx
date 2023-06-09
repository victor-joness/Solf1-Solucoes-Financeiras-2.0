import * as c from './styles'
import React from 'react';

type Props = {
    title: string;
    value: number;
    color?: string;
}

export const ResumeItem = ({title, value, color}: Props) => {
    const formatedValue = (value : any) => {
        let fixedValue = value;
        let formatValue = parseFloat(fixedValue)
        return formatValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    return (
        <div>
            <c.Container>
                <c.Title>{title}</c.Title>
                <c.Info color={color}>{formatedValue(value)}</c.Info>
            </c.Container>
        </div>
    )
}