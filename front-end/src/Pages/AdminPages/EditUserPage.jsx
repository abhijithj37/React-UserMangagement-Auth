import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../Components/AdminComponents/AdminHeader";
import EditUserMain from "../../Components/AdminComponents/AdminHomeMain/editUserMain/EditUserMain";
import { useDispatch, useSelector } from "react-redux";
import { setEditUser } from "../../features/adminSlice";

function EditUserPage() {
    const [err,setErr]=useState(null)
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`admin/getUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.user,'edit user');
        dispatch(setEditUser(res.data.user));
      })
      .catch((err) =>{
        setErr(err)
      });
  },[dispatch]);
  const {editUser}=useSelector((state)=>state.admin)
  
  if(err!=null){
    return <div>
        <h1>Error Loading page </h1>
        <a href="/adminLogin">Login to continue</a>
    </div>
  }
  return (
    <div>
      <AdminHeader />
      <EditUserMain user={editUser} />
    </div>
  );
}

export default EditUserPage;
