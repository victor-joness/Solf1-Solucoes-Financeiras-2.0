import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./AuthPage.css";

import logo from "../../images/LOGO.png";

const AuthPage = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/dashboard");
    }
  }, [auth.id, navigate]);

  const escolheuSignUp = () => {
    navigate(`/register`);
  };

  const escolheuSignIn = () => {
    navigate(`/login`);
  };

  const escolheuHome = () => {
    navigate("/");
  };

  return (
    <div className="Login-Container">
      <div className="Login-Container-Direita">
        <div className="Login-Container-Direita__buttons">
          <div className="Login-Container-Direita__buttons__image">
            <img src={logo} alt="logo do solf1" />
          </div>
          <div className="Login-Container-Direita__buttons__options">
            <div
              className="Login-Container-Direita__buttons__options__signup"
              onClick={escolheuSignUp}
            >
              <p>Register</p>
            </div>

            <div
              className="Login-Container-Direita__buttons__options__signin"
              onClick={escolheuSignIn}
            >
              <p>Login</p>
            </div>
            <div
              className="Login-Container-Direita__buttons__options__home    "
              onClick={escolheuHome}
            >
              <p>Home</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
