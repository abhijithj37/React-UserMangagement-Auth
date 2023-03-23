import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import { setAdminLoginStatus } from '../../features/adminSlice';
function AdminLogin() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch=useDispatch()
  const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log("its login");
        e.preventDefault();
        axios
          .post("/admin/adminLogin", formData)
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("adminToken", token);
            dispatch(setAdminLoginStatus(true))
            navigate("/admin");
          })
          .catch((error) => {
            if (error) {
              setErrorMessage(error.response.data);
            }
          });
      };
      const { status } = useSelector((state) => state.admin);
      useEffect(() => {
        console.log("hai admin");
        if (status) {
          console.log(status,'admin status');
          navigate("/admin");
        }
      },[status]);
  return (
    <div className="register" style={{backgroundImage:`linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))`}}>
      <div className="form-div">
        <h1>Admin Login</h1>
        <h2>{errorMessage}</h2>
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            placeholder="User Name"
            value={formData.userName}
            onChange={(e) => {
              setFormData({ ...formData, userName: e.target.value });
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
         
      </div>
    </div>
  )
}

export default AdminLogin
