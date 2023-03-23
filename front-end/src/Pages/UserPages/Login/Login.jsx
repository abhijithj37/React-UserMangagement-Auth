import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("its login");
    e.preventDefault();
    axios
      .post("login", formData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("jwt", token);
        console.log(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        if (error) {
          setErrorMessage(error.response.data);
        }
      });
  };
  const { status } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("hai");
    if (status) {
      console.log("true");
      navigate("/");
    }
  });

  return (
    <div className="register">
      <div className="form-div">
        <h1>Login</h1>
        <h2>{errorMessage}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />

          <button type="submit" className="submitButton">
            Login
          </button>
        </form>
        <a style={{ color: "Highlight" }} href="/register">
          Dont have an account ?
        </a>
      </div>
    </div>
  );
}

export default Login;
