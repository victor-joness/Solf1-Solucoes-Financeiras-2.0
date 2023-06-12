import styled from "styled-components"

export const Container = styled.div<{theme: string}>`
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    background-color: ${props => props.theme.status === 'light' ? '#fff' : '#fff'};
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: center;

    input {
        width: 100%;
        height: auto;
        padding: 10px;
        border-right: 0;
        border-left: 0;
        outline: 0;
        background-color: transparent;
        color: ${props => props.theme.status === 'light' ? '#000' : '#000'};

        ::placeholder {
            color: ${props => props.theme.status === 'light' ? '#000' : '#000'};
        }
    };

    .inputText {
        border: 2px solid #ccc;
        border-radius: 20px 0px 0px 20px;
        border-right: 0;
    };

    .inputNumber {
        border: 2px solid #ccc;
        width: 30%;
        border-right: 0;
    }

    .inputDate {
        border: 2px solid #ccc;
        width: 30%;
        border-right: 0;
    }

    select {
        border: 2px solid #ccc;
        width: 30%;
        height: auto;
        padding: 10px
        outline: 0;
        border-right: 0;
        color: ${props => props.theme.status === 'light' ? '#000' : '#000'};
        background-color: ${props => props.theme.status === 'light' ? '#fff' : '#fff'};
    };

    .option {
        background-color: ${props => props.theme.status === 'light' ? '#fff' : '#fff'};
        color: ${props => props.theme.status === 'light' ? '#000' : '#000'};
    }

    button {
        width: 30%;
        height: auto;
        padding: 10px;
        color: #fff;
        border: 2px solid #cccccc;
        border-left 0;
        border-radius: 0px 20px 20px 0px;
        font-weight: bold;
        background-color: #40b189;
        outline: 0;
        cursor: pointer;

        &:hover {
            background-color: #40b189;
        }
    }
`