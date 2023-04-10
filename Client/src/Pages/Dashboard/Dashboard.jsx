import React from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";

import { useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import Header from "../../Components/Header/Header";

import UserContainer from "../../Components/UserContainer/UserContainer";
import OptionsContainer from "../../Components/OptionsContainer/OptionsContainer";

const Dashboard = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  console.log(auth);

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
