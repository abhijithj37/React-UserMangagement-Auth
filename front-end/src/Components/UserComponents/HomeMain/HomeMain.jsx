import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HomeMain.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

function HomeMain({ user }) {
  const dispatch = useDispatch();
  const[errorMessage,setErrorMessage]=useState('')
  const [err,setErr]=useState(null)
  const [editStatus, setEditStatus] = useState(false);
  const[imagePreview,setImagePreview]=useState('')
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    image: "",
  });
  useEffect(() => {
    setFormData({
      ...user,
    });
  }, [user]);
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
     const formBody=new FormData();
    formBody.append('name',formData.name);
    formBody.append('userName',formData.userName);
    formBody.append('email',formData.email);
    formBody.append('mobile',formData.mobile);
    formBody.append('image',formData.image);
    const token = localStorage.getItem("jwt");

    axios
      .put("/updateUser", formBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      })
      .then((res) => {
        console.log(res);
        setEditStatus(false);
        setErrorMessage('')
        dispatch(setUser({ user: res.data.user }));
      })
      .catch((error) => {
        if(error.response&&error.response.status==401){
          setErr(error.response.message)

        }
       });
  };



  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };


   
  if(err!==null){
         
  return  <div>
    <h1>Session Expired Login to continue</h1>
     <a href="/login">Login To Continue</a>
    </div>
  }

  return (
    <div className="homeMain">
      {user ? (
        <div>
          <div className="profile-container">
             <div className="profile">
             <div>{errorMessage}</div>

              <div className="profile-head">
                <div className="profile-photo">
                  {
                    imagePreview?(<img src={imagePreview} alt='Profile-Pic'/>):(<img
                      src={`http://localhost:3000/image/${user.image}`}
                      alt="Profile-Pic"
                    />)
                  }
                   
                </div>
                <div className="form">
                  <input
                    id="file-upload"
                    type="file"
                    name="image"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  {
                    editStatus&&<label
                    className=""
                    
                    for="file-upload"
                  >
                    Upload Image
                  </label>
                  }
                   
                   
                </div>

                <div className="user-name">
                  <h1>{user.name}</h1>
                </div>
              </div>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label htmlFor="">Full Name : </label>
                  <input
                    type="text"
                    value={formData.name}
                    style={
                      editStatus ? { borderBottom: "1px solid black" } : {}
                    }
                    readOnly={!editStatus}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>User Name : </label>
                  <input
                    type="text"
                    value={formData.userName}
                    style={
                      editStatus ? { borderBottom: "1px solid black" } : {}
                    }
                    readOnly={!editStatus}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, userName: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">User Id : </label>
                  <input
                    type="text"
                    value={user._id}
                    required
                    readOnly={true}
                  />
                </div>
                <div>
                  <label>Email Address : </label>
                  <input
                    type="email"
                    value={formData.email}
                    style={
                      editStatus ? { borderBottom: "1px solid black" } : {}
                    }
                    readOnly={!editStatus}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Mobile Number : </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    style={
                      editStatus ? { borderBottom: "1px solid black" } : {}
                    }
                    readOnly={!editStatus}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                </div>

                <div>
                  {editStatus && (
                    <button type="submit" className="Save-button">
                      Save Changes
                    </button>
                  )}
                </div>
              </form>
              <button
                onClick={() => setEditStatus(true)}
                className="Edit-button"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1>Welcome To CODE_SPACE</h1>
          <NavLink to="/login">Login to continue</NavLink>
        </div>
      )}
    </div>
  );
}

export default HomeMain;
