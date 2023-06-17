import React from "react";
import "./Navbar.css";

import logo from "../../images/LOGO.png";

import house from "../../images/icons navbar/HOUSE.png";
import user from "../../images/icons navbar/USER.png";
import galeria from "../../images/icons navbar/GALERIA.png";
import cartao from "../../images/icons navbar/CARTAO.png";
import identidade from "../../images/icons navbar/IDENTIDADE.png";
import avatar from "../../images/AVATAR-ICON.png";
import exit from "../../images/EXIT.png";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../Features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const House = () => {
    navigate("/home-login");
  }

  const User = () => {
    navigate("/perfil");
  };

  const Dashboard = () => {
    navigate("/dashboard");
  };

  const cartoes = () => {
    navigate("/cartoes");
  };

  const Naoadmin = () => {
    toast.error("Apenas Admin podem acessar");
  }

  const admin = () => {
    navigate("/graficos");
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  if (auth.isAdmin) {
    return (
      <div className="container">
        <div className="container-image">
          <img src={logo} alt="logo do solf1" />
        </div>

        <div className="container-icons">
          <div className="container-icons__primeiro" onClick={House}>
            <img src={house} alt="icon house navbar" />
          </div>

          <div className="container-icons__segundo" onClick={User}>
            <img src={user} alt="icon user navbar" />
          </div>

          <div className="container-icons__terceiro" onClick={Dashboard}>
            <img src={galeria} alt="icon galeria navbar" />
          </div>

          <div className="container-icons__quarto" onClick={cartoes}>
            <img src={cartao} alt="icon cartao navbar" />
          </div>

          <div className="container-icons__quinto" onClick={admin}>
            <img src={identidade} alt="icon identidade navbar" />
          </div>
        </div>

        <div className="container-user">
          <div className="container-avatar">
            <img src={`/upload/${auth.Img}`} alt="icon avatar navbar" />
          </div>
          <div className="container-exit" onClick={handleLogout}>
            <img src={exit} alt="icon exit navbar" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="container-image">
          <img src={logo} alt="logo do solf1" />
        </div>

        <div className="container-icons">
          <div className="container-icons__primeiro" onClick={House}>
            <img src={house} alt="icon house navbar" />
          </div>

          <div className="container-icons__segundo" onClick={User}>
            <img src={user} alt="icon user navbar" />
          </div>

          <div className="container-icons__terceiro" onClick={Dashboard}>
            <img src={galeria} alt="icon galeria navbar" />
          </div>

          <div className="container-icons__quarto" onClick={cartoes}>
            <img src={cartao} alt="icon cartao navbar" />
          </div>

          <div className="container-icons__quinto" onClick={Naoadmin}>
            <img src={identidade} alt="icon identidade navbar" />
          </div>
        </div>

        <div className="container-user">
          <div className="container-avatar">
            <img src={`/upload/${auth.Img}`} alt="icon avatar navbar" />
          </div>
          <div className="container-exit" onClick={handleLogout}>
            <img src={exit} alt="icon exit navbar" />
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
