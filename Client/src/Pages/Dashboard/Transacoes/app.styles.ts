import styled from 'styled-components'

export const Container = styled.div<{theme: string}>`
    background-color:  ${props => props.theme.status === 'light' ? '#080808ec' : '#000'};
    height: 100%;
    padding-bottom: 57px;
    font-size: 20px;

    footer {
        text-align: center;
        font-weight: bold;
        padding-top: 35px;

        a {
            color: #fff;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            } 
        }
    } 
`;

export const Header = styled.div<{theme: string}>`
    background-color:  ${props => props.theme.status === 'light' ? '#080808ec' : '#000'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    height: 170px
`;

export const HeaderArea = styled.div`
    margin: auto;
    max-width: 1200px;
    display: flex;
    align-items: start;
    justify-content: center;
`;

export const HeaderText = styled.h1`
    margin: 0;
    padding: 0;
    height: 65%;
    padding-bottom: 30px;
    font-size: 40px;
    text-align: start;
    margin-bottom: 10px;
    margin-left: 330px;
    margin-right: 290px;
`;

export const Body = styled.div`
    max-width: 1200px;
    margin: auto;
    margin-bottom: 22px;
`;



