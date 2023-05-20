import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import themeReducer from "../src/Pages/Dashboard/Transacoes/redux/reducers/themeReducer";
import searchReducer from "../src/Pages/Dashboard/Transacoes/redux/reducers/searchReducer";

import authReducer, { loadUser } from "./Features/authSlice";
import enderecoReducer from "./Features/enderecoSlice";
import cartoesReducer from "./Features/cartoesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    endereco: enderecoReducer,
    cartoes: cartoesReducer,
    theme: themeReducer,
    searchItem: searchReducer
  },
});

store.dispatch(loadUser(null));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
