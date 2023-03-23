import React, {  } from 'react'
 import { NavLink } from 'react-router-dom';
import { setAdminLoginStatus } from '../../features/adminSlice';
import { useDispatch } from 'react-redux';
function AdminHeader() {
     

    const dispatch=useDispatch()
    const handleLogout=()=>{
        if(window.confirm('Are You Sure Want to logout ?')){
            localStorage.removeItem('adminToken')
            dispatch(setAdminLoginStatus(false))
            window.location.href='/adminLogin'

        }
     }
  return (
    <header>
    <div className="head" style={{backgroundImage:`linear-gradient(to right, rgba(255,0,0,.5),rgba(255,0,0,1))`}}>
    <div className="logo">CodeSPACE</div>
    <nav>
      <NavLink>ADMIN PAGE</NavLink>

      
        <span>
          <NavLink>HOME</NavLink>
          <NavLink
            className="active"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </NavLink>
        </span>
      
        
      
    </nav>
    
    
  </div>
  
  </header>
  )
}

export default AdminHeader
