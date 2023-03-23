import "./Register.css";
import axios from "../../../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    userName: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.userName.length<4){
      setErrorMessage('User Name must have at least 4 characters')
      return
    }
    if(formData.name.length<4){
      setErrorMessage(' Name must have at least 4 characters')
      return
    }
    if(!/^\d{10}$/.test(formData.mobile)){
      setErrorMessage('Please Enter a valid mobile number')
      return
    }
    if(formData.password.length<5){
      setErrorMessage('Password must Contain at least 5 characters')
      return
    }
    console.log('submitteed');
    axios
      .post("register", formData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if(error){
          
          
          setErrorMessage(error.response.data);
        }
         
      });
  };
  return (
    <div className="register">
      <div className="form-div">
        <h1>SignUp</h1>
        <h2>{errorMessage}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.userName}
            required
            placeholder="User Name"
            onChange={(e) => {
              setFormdata({ ...formData, userName: e.target.value });
            }}
          />
          <input
            type="text"
            value={formData.name}
            placeholder="Full Name"
            required
            onChange={(e)=>{
              setFormdata({...formData, name: e.target.value });
            }}
          />
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            required
            onChange={(e) => {
              setFormdata({ ...formData,email:e.target.value });
            }}
          />
          <input
            type="number"
            value={formData.mobile}
            placeholder="Mobile Number"
            required
            onChange={(e)=>
              setFormdata({ ...formData,mobile: e.target.value })
            }
          />
          <input
            type="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={(e) => {
              setFormdata({...formData,password:e.target.value});
            }}
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        <a style={{ color: "Highlight" }} href="/login">
          allready have an account ?
        </a>
      </div>
    </div>
  );
}

export default Register;
