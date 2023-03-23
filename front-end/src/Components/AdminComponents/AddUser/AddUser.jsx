import axios from '../../../axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddUser() {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({name:'',userName:'',email:'',mobile:'',password:''})
    const[errorMessage,setErrorMessage]=useState('')
    const handleSubmit=(e)=>{
     e.preventDefault()
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
     const token=localStorage.getItem('adminToken')
     axios.post('admin/addUser',formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     }).then((res)=>{
        navigate('/admin')
     }).catch((error)=>{
        
        setErrorMessage(error.response.data)
        
      })
    }

  return (
   <div className='add-user'> 
    <div className="register" style={{backgroundImage:`radial-gradient(circle, rgba(255,255,255,1) 100%, rgba(148,187,233,1) 100%)`}}>
      <div className="form-div" style={{ borderColor: "gray"}}>
        <h1 style={{color:'GrayText'}}>Add User</h1>
        <h2>{errorMessage}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.userName}
            placeholder="User Name"
            required
            onChange={(e) => {
              setFormData({ ...formData, userName: e.target.value });
            }}
          />
          <input
            type="text"
            value={formData.name}
            placeholder="Full Name"
            required
            onChange={(e)=>{
              setFormData({...formData, name: e.target.value });
            }}
          />
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            required
            onChange={(e) => {
              setFormData({ ...formData,email:e.target.value });
            }}
          />
          <input
            type="number"
            value={formData.mobile}
            placeholder="Mobile Number"
            required
            onChange={(e)=>
              setFormData({ ...formData,mobile: e.target.value })
            }
          />
          <input
            type="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={(e) => {
              setFormData({...formData,password:e.target.value});
            }}
          />
          <button type="submit" className="submitButton">
            Add
          </button>
        </form>
         
      </div>
    </div>
    </div>
  )
}

export default AddUser
