import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";

import { toast } from "react-toastify";

const initialState = {
  categorias: [],
  status: "",
  deleteStatus: "",
  updateStatus: "",
};

export const categoriasFetch = createAsyncThunk(
  "categorias/categoriasFetch",
  async (user) => {
    const response = await axios.get(
      `${url}/categorias/getCategorias/${user}`,
      setHeaders()
    );

    return response.data;
  }
);

export const categoriasCreate = createAsyncThunk(
  "categorias/categoriasCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/categorias`,
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

export const categoriasDelete = createAsyncThunk(
  "categorias/categoriasDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/categorias/${id}`,
        setHeaders()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const categoriasUpdate = createAsyncThunk(
  "categorias/categoriasUpdate",
  async (categoria, { rejectWithValue }) => {
    console.log(categoria);

    try {
      const data = await axios.post(`${url}/categorias/${categoria.id}`,categoria, setHeaders());
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {},
  extraReducers: {
    [categoriasUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [categoriasUpdate.fulfilled]: (state, action) => {
      state.updateStatus = "success";
      if(action.payload.msg === "Não é possível editar uma categoria com transações!") {
        toast.error(action.payload.msg);
      }else{
        toast.success(action.payload.msg);
      }
      
    },
    [categoriasUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },

    [categoriasCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [categoriasCreate.fulfilled]: (state, action) => {
      if (action.payload.msg === "Já Existe um cartão com esse número!") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.categorias.push(action.payload.categoria);
        toast.success(action.payload.msg);
      }
    },
    [categoriasCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },

    [categoriasFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [categoriasFetch.fulfilled]: (state, action) => {
      state.categorias = action.payload;
      state.status = "success";
    },
    [categoriasFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [categoriasDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [categoriasDelete.fulfilled]: (state, action) => {
      if (action.payload.msg === "Não é possível deletar uma categoria com transações!") {
        toast.error(action.payload.msg);
      } else {
        const newList = state.categorias.filter(
          (categoria) => categoria.id !== action.meta.arg
        );
        state.categorias = newList;
        state.deleteStatus = "success";
        toast.error(action.payload.msg);
      }
    },
    [categoriasDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default categoriasSlice.reducer;
