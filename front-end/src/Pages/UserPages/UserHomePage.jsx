import React, { useEffect } from "react";
import UserHeader from "../../Components/UserComponents/UserHeader/UserHeader";
import HomeMain from "../../Components/UserComponents/HomeMain/HomeMain";
import axios from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/userSlice";


function UserHomePage() {
    const dispatch=useDispatch()
    

    useEffect(()=>{
        const token=localStorage.getItem('jwt')
         axios.get('/user',{
            headers:{
                Authorization:`Bearer ${token}`,
            },
         }).then((res)=>{
         console.log(res.data.user,'ress');
         dispatch(setUser({user:res.data.user}))
         })
    },[dispatch])
    const {user}=useSelector((state)=>state.user)
  return (
    <div>
      <UserHeader user={user} />
      <HomeMain user={user}/>
      
    </div>
  );
}

export default UserHomePage;
