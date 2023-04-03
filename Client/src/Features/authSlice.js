import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  id: "",
  isAdmin: "",
  Img: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

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
      return data.data.user.token;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
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
          id: user.id,
          isAdmin: user.isAdmin,
          Img: user.Img,
          userLoaded: true,
        };
      }
    },
    extraReducers: (builder) => {
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
    },
  },
});

export const { loadUser } = authSlice.actions;

export default authSlice.reducer;
