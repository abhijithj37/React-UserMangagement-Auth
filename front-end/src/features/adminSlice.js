import { createSlice } from "@reduxjs/toolkit";

 const initialState={
    userData:null,
    status:false,
    editUser:null
}
const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
       updateUsers:(state,action)=>{
         state.userData=action.payload.users
         state.status=true
       },
        
       setAdminLoginStatus:(state,action)=>{
        state.status=action.payload
       },
    setEditUser:(state,action)=>{
        state.editUser=action.payload
    }
        
    }
 })
 
 export default adminSlice.reducer
 export const {updateUsers,adminLogout,setAdminLoginStatus,setEditUser}=adminSlice.actions