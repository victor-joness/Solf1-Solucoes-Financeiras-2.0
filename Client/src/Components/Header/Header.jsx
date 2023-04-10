import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";


const Header = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  return (
    <div className="container-direita-header">
      <img src={`/upload/${auth.Img}`} alt="Imagem do user" />
      <h1>{auth.name}</h1>
    </div>
  );
};

export default Header;
