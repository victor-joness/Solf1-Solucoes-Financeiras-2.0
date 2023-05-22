import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'searchItem',
    initialState: {
        titulo: '',
        categoria: '',
        cartao: '',
    },
    reducers: {
        setTitle: (state, action) => {
            state.titulo = action.payload;
        },
        setCategory: (state, action) => {
            state.categoria = action.payload;
        },
        setCartao: (state, action) => {
            state.cartao = action.payload;
        }
    }
})

export const { setTitle, setCategory, setCartao } = slice.actions;
export default slice.reducer;

// 1 - State é o dado inicial
// 2 - Action é ação que recebera os dados e os mudará para os daados recebidos pelo payload 
// 3 - payload é são os novos dados recebidos e que substituirão os dados iniciais