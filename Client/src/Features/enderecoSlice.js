import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";

const initialState = {
  id: "",
  cidade: "",
  estado: "",
  cep: "",
  numero: "",
  bairro: "",
  status: "",
};

export const enderecoFetch = createAsyncThunk(
  "endereco/enderecoFetch",
  async (user) => {
    const response = await axios.get(`${url}/endereco/getEndereco/${user}`, setHeaders());

    return response.data[0];
  }   
);

export const updateEndereco = createAsyncThunk(
  "auth/updateEndereco",
  async (endereco, { rejectWithValue }) => {
    try {
      const data = await axios.put(`${url}/endereco`, {
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
);

const enderecoSlice = createSlice({
  name: "endereco",
  initialState,
  reducers: {},
  extraReducers: {
    [updateEndereco.pending]: (state, action) => {
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
    },
    
    [enderecoFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [enderecoFetch.fulfilled]: (state, action) => {
      state.status = "success";

      (state.id = action.payload.id),
        (state.cidade = action.payload.cidade),
        (state.estado = action.payload.estado),
        (state.cep = action.payload.cep),
        (state.numero = action.payload.numero),
        (state.bairro = action.payload.bairro);
    },
    [enderecoFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default enderecoSlice.reducer;
