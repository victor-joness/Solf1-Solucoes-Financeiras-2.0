import React, { useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";

import UserContainer from "../../Components/UserContainer/UserContainer";
import OptionsContainer from "../../Components/OptionsContainer/OptionsContainer";

import { enderecoFetch } from "../../Features/enderecoSlice";
import { transacoesFetch } from "../../Features/transacoes";

const Dashboard = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/dashboard");
    }
  }, [auth.id, navigate]);

  dispatch(transacoesFetch(auth.id));
  dispatch(enderecoFetch(auth.id));

  if (auth.token) {
    return (
      <div className="container-dashboard">
        <Navbar></Navbar>
        <div className="container-direita-dashboard">
          <Header></Header>

          <div className="container-direita-center">
            <div className="Dashboard--Container--direita__menu">
              <UserContainer></UserContainer>
              <OptionsContainer></OptionsContainer>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default Dashboard;
