import React, { useState, useEffect } from "react";
import "../AdminHomeMain/AdminHomeMain.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { useDispatch } from "react-redux";
import { updateUsers } from "../../../features/adminSlice";


function AdminHomeMain({ userData }) {
  const [err, setErr] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (userId) => {
    navigate(`/editUser/${userId}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are You sure want to Delete")) {
      const token = localStorage.getItem("adminToken");
      axios
        .delete(`admin/deleteUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(updateUsers({ users: res.data.users }));
        })
        .catch((err) => {
          setErr(err);
        });
    }
  };

  useEffect(() => {
    const filteredUserData = userData?.filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredUserData);
  }, [userData, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="admin-home">
      <div className="link-div">
        <a href="/addUser">Add User</a>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search User"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>User ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((user) => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user._id}</td>
                <td>
                  <button onClick={() => handleEdit(user._id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHomeMain;
