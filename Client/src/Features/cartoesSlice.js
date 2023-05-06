import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";

import { toast } from "react-toastify";

const initialState = {
  cartoes: [],
  status: "",
};

export const cartoesFetch = createAsyncThunk(
  "cartoes/cartoesFetch",
  async (user) => {
    const response = await axios.get(
      `${url}/cartoes/getCartoes/${user}`,
      setHeaders()
    );

    return response.data;
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const cartoesCreate = createAsyncThunk(
  "cartoes/cartoesCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/cartoes`,
        values,
        setHeaders()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

/* export const updateEndereco = createAsyncThunk(
  "auth/updateEndereco",
  async (endereco, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${url}/endereco`, {
        id: endereco.id,
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep,
        numero: endereco.numero,
        bairro: endereco.bairro,
      });
      return data.data.endereco;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
); */

const cartoesSlice = createSlice({
  name: "cartoes",
  initialState,
  reducers: {},
  extraReducers: {
    /* [updateEndereco.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateEndereco.fulfilled]: (state, action) => {
      state.status = "success";

      (state.id = action.payload.id),
        (state.cidade = action.payload.cidade),
        (state.estado = action.payload.estado),
        (state.cep = action.payload.cep),
        (state.numero = action.payload.numero),
        (state.bairro = action.payload.bairro);
    },
    [updateEndereco.rejected]: (state, action) => {
      state.status = "rejected";
    }, */
    [cartoesCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [cartoesCreate.fulfilled]: (state, action) => {
      if (action.payload.msg === "Já Existe um cartão com esse número!") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.cartoes.push(action.payload.cartoes);
        toast.success(action.payload.msg);
      }
    },
    [cartoesCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },

    [cartoesFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [cartoesFetch.fulfilled]: (state, action) => {

      state.cartoes = action.payload;
      state.status = "success";
    },
    [cartoesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default cartoesSlice.reducer;
