import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";

import { toast } from "react-toastify";

const initialState = {
  cartoes: [],
  status: "",
  deleteStatus: "",
  updateStatus: "",
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
      const response = await axios.post(`${url}/cartoes`, values, setHeaders());
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const updateCartoes = createAsyncThunk(
  "cartoes/updateCartoes",
  async (cartao, { rejectWithValue }) => {
    try {
      const data = await axios.put(`${url}/cartoes`,cartao, setHeaders());
      return data.data.cartoes;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartoesDelete = createAsyncThunk(
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
);

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

    [updateCartoes.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [updateCartoes.fulfilled]: (state, action) => {
      state.updateStatus = "success";

      console.log(state.payload);
    },
    [updateCartoes.rejected]: (state, action) => {
      state.updateStatus = "rejected";
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
    },
  },
});

export default cartoesSlice.reducer;
