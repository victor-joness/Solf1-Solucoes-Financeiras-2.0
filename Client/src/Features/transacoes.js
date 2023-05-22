import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";

import { toast } from "react-toastify";

const initialState = {
  transacoes: [],
  status: "",
  deleteStatus: "",
  updateStatus: "",
};

/* export const cartoesFetch = createAsyncThunk(
  "cartoes/cartoesFetch",
  async (user) => {
    const response = await axios.get(
      `${url}/cartoes/getCartoes/${user}`,
      setHeaders()
    );

    return response.data;
  }
); */

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const transacaoCreate = createAsyncThunk(
  "transacao/transacaoCreate",
  async (values) => {
    try {
      const response = await axios.post(`${url}/transacoes`, values, setHeaders());
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
/* 
export const updateCartoes = createAsyncThunk(
  "cartoes/updateCartoes",
  async (cartao, { rejectWithValue }) => {
    console.log(cartao);

    try {
      const data = await axios.post(`${url}/cartoes/${cartao.id}`,cartao, setHeaders());
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
); */

/* export const cartoesDelete = createAsyncThunk(
  "cartoes/cartoesDelete",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/cartoes/${id}`, setHeaders());
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
); */

const cartoesSlice = createSlice({
  name: "cartoes",
  initialState,
  reducers: {},
  extraReducers: {
    /* [updateCartoes.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [updateCartoes.fulfilled]: (state, action) => {
      state.updateStatus = "success";
      toast.success(action.payload.msg);
    },
    [updateCartoes.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    }, */
    [transacaoCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [transacaoCreate.fulfilled]: (state, action) => {
        state.createStatus = "success";
        state.transacoes.push(action.payload.transacao);
        toast.success(action.payload.msg);
    },
    [transacaoCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },

    /* [cartoesFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [cartoesFetch.fulfilled]: (state, action) => {
      state.cartoes = action.payload;
      state.status = "success";
    },
    [cartoesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [cartoesDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [cartoesDelete.fulfilled]: (state, action) => {
      const newList = state.cartoes.filter(
        (doutor) => doutor.id !== action.meta.arg
      );
      state.cartoes = newList;
      state.deleteStatus = "success";
      toast.error("Cartão Deletado com Sucesso");
    },
    [cartoesDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    }, */
  },
});

export default cartoesSlice.reducer;
