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

export const transacoesFetch = createAsyncThunk(
  "transacoes/transacoesFetch",
  async (id) => {
    const response = await axios.get(
      `${url}/transacoes/getTransacoes/${id}`,
      setHeaders()
    );

    return response.data;
  }
);

export const transacoesCartoesUpdate = createAsyncThunk(
  "transacoes/transacoesCartoesUpdate",
  async (dados) => {
    const response = await axios.put(
      `${url}/transacoes`,dados,
      setHeaders()
    );

    console.log(response.data);

    return response.data;
  }
);

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

export const updateTransacao = createAsyncThunk(
  "transacao/updateTransacao",
  async (transacao, { rejectWithValue }) => {
    console.log(transacao);

    try {
      const data = await axios.post(`${url}/transacoes/${transacao.id}`,transacao, setHeaders());
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const transacoesDelete = createAsyncThunk(
  "transacoes/transacoesDelete",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/transacoes/${id}`, setHeaders());
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
    [updateTransacao.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [updateTransacao.fulfilled]: (state, action) => {
      state.updateStatus = "success";
      toast.success(action.payload.msg);
    },
    [updateTransacao.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },

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

    [transacoesFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [transacoesFetch.fulfilled]: (state, action) => {
      state.transacoes = action.payload;
      state.status = "success";
    },
    [transacoesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [transacoesCartoesUpdate.pending]: (state, action) => {
      state.status = "pending";
    },
    [transacoesCartoesUpdate.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [transacoesCartoesUpdate.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [transacoesDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [transacoesDelete.fulfilled]: (state, action) => {
      const newList = state.transacoes.filter(
        (transacao) => transacao.id !== action.meta.arg
      );
      state.transacoes = newList;
      state.deleteStatus = "success";
      toast.error("Transação Deletada com Sucesso");
    },
    [transacoesDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    }
  },
});

export default cartoesSlice.reducer;
