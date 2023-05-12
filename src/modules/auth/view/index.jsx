import React from "react";
import '../css/index.css';
import Input from "../components/input";

function Login() {
  return (
    <div className="container-fluid zoro d-flex align-items-center justify-content-center vh-100">
      <div className="login-box text-light">
      
        <Input className="login" placeholder="Inisciar"/>
        <Input className="sing-up" placeholder="Registrar"/>

        <Input className="email container-fluid" placeholder="Ingrese su correo"/>
        <Input className="password container-fluid" placeholder="Ingrese su contraseña"/>

        <Input className="enter container-fluid" placeholder="Entrar"/>

      </div>
    </div>

  );
}

export default Login;