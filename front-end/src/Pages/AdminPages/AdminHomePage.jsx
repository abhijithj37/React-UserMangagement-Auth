import axios from '../../axios'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsers } from '../../features/adminSlice'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import AdminHomeMain from '../../Components/AdminComponents/AdminHomeMain/AdminHomeMain'
import { useNavigate } from 'react-router-dom'





function AdminHomePage() {
    
    const dispatch=useDispatch()
    const [err,setErr]=useState(null)
     const navigate=useNavigate()
      useEffect(()=>{
         
        
            const token=localStorage.getItem('adminToken')
            console.log(token,'admintoken');
            axios.get('admin/getAllUsers',{
               headers:{
                   Authorization:`Bearer ${token}`,
               },
            }).then((res)=>{
            console.log(res.data.users,'ress');
            dispatch(updateUsers({users:res.data.users}))
            }).catch((err)=>{
                if(err){
                    setErr(err.response.data)
                    navigate('/adminLogin')
                }
            })
    },[dispatch])
    const{userData}=useSelector((state)=>state.admin)
     
  return (
    
    <div>
    <AdminHeader/>
    <AdminHomeMain userData={userData}/>
    </div>
    
  )
}

export default AdminHomePage
