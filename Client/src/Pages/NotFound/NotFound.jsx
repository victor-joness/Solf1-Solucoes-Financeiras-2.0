import React from "react";
import "./NotFound.css";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleCLickHomepage = () => {
    navigate("/");
  };

  return (
    <div className="container-not-found">
      <div className="box">
        <h1>Página não encontrada</h1>
        <button onClick={handleCLickHomepage}>Voltar a Home Page</button>
      </div>
    </div>
  );
};

export default NotFound;
