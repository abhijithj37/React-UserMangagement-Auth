import axios from "../../../../axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { updateUsers } from "../../../../features/adminSlice";
function EditUserMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { editUser } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    mobile: "",
    email: "",
    image: "",
  });
  useEffect(() => {
    setFormData({ ...editUser });
  }, [editUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userName.length < 4) {
      setErrorMessage("User Name must have at least 4 characters");
      return;
    }
    if (formData.name.length < 4) {
      setErrorMessage(" Name must have at least 4 characters");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setErrorMessage("Please Enter a valid mobile number");
      return;
    }
    if (formData.password.length < 5) {
      setErrorMessage("Password must Contain at least 5 characters");
      return;
    }
    const formBody = new FormData();
    formBody.append("name", formData.name);
    formBody.append("userName", formData.userName);
    formBody.append("email", formData.email);
    formBody.append("mobile", formData.mobile);
    formBody.append("image", formData.image);
    const token = localStorage.getItem("adminToken");
    axios
      .put(`admin/userUpdate/${editUser._id}`, formBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(updateUsers({ users: res.data.users }));
        navigate("/admin");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          console.log(err);
          setErr(err);
        }
      });
  
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  if (err !== null) {
    return (
      <div>
        <h1>Session Expired Login to continue</h1>
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <div className="homeMain">
      {editUser ? (
        <div>
          <div className="profile-container">
            <div className="profile">
              <div>{errorMessage}</div>

              <div className="profile-head">
                <div className="profile-photo">
                  {
                    imagePreview?(<img src={imagePreview} alt="Profile-Pic"/>):(<img
                      src={`http://localhost:3000/image/${editUser.image}`}
                      alt="Profile-Pic"
                    />)
                  }
                   
                </div>
                <div className="form">
                  <input
                    id="file-upload"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <label className="" for="file-upload">
                    Upload Image
                  </label>
                </div>

                <div className="user-name">
                  <h1>{editUser.name}</h1>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="">Full Name : </label>
                  <input
                    type="text"
                    value={formData.name}
                    style={{ borderBottom: "1px solid black" }}
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
                    style={{ borderBottom: "1px solid black" }}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, userName: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">User Id : </label>
                  <input type="text" value={editUser._id} readOnly={true} />
                </div>
                <div>
                  <label>Email Address : </label>
                  <input
                    type="email"
                    value={formData.email}
                    style={{ borderBottom: "1px solid black" }}
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
                    style={{ borderBottom: "1px solid black" }}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                </div>

                <div>
                  <button type="submit" className="Save-button">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1>Page Not Found</h1>
          <NavLink to="/adminLogin">Login to continue</NavLink>
        </div>
      )}
    </div>
  );
}

export default EditUserMain;
