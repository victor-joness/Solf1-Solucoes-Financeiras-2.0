import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";
import { setHeaders } from "./api";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  celular: "",
  endereco: "",
  id: "",
  isAdmin: "",
  Img: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    console.log(user);
    try {
      const data = await axios.post(`${url}/register`, {
        name: user.username,
        email: user.email,
        celular: user.celular,
        endereco: user.endereco,
        password: user.password,
        isAdmin: user.isAdmin,
        Img: user.Img,
      });

      console.log(data.data.token);

      /* localStorage.setItem("token", data.data.token); */
      return data.data.token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password,
      });
      console.log(data);

      localStorage.setItem("token", data.data.usuario.token);
      return data.data.usuario.token;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await axios.put(`${url}/register/updateUser`, {
        id: user.id,
        Img: user.Img,
        name: user.name,
        email: user.email,
        celular: user.celular,
        password: user.password,
      });

      localStorage.setItem("token", data.data.token);
      return data.data.token;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userDelete = createAsyncThunk(
  "auth/userDelete",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/register/${id}`, setHeaders());
      localStorage.setItem("token", "");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          celular: user.celular,
          endereco: user.endereco,
          id: user.id,
          isAdmin: user.isAdmin,
          Img: user.Img,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        celular: "",
        endereco: "",
        id: "",
        isAdmin: "",
        Img: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        updateStatus: "",
        updateError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          celular: user.celular,
          endereco: user.endereco,
          id: user.id,
          isAdmin: user.isAdmin,
          Img: user.Img,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        console.log(user);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          celular: user.celular,
          endereco: user.endereco,
          id: user.id,
          isAdmin: user.isAdmin,
          Img: user.Img,
          loginStatus: "success",
        };
      } else {
        return state;
      }
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return { ...state, updateStatus: "pending" };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          celular: user.celular,
          endereco: user.endereco,
          id: user.id,
          isAdmin: user.isAdmin,
          Img: user.Img,
          updateStatus: "success",
        };
      } else {
        return state;
      }
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        updateError: action.payload,
      };
    });

    builder.addCase(userDelete.pending, (state, action) => {
      return { ...state, deleteStatus: "pending" };
    });

    builder.addCase(userDelete.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          msg: action.payload,
          deleteStatus: "success",
        };
      } else {
        return state;
      }
    });

    builder.addCase(userDelete.rejected, (state, action) => {
      return {
        ...state,
        deleteStatus: "rejected",
        updateError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
