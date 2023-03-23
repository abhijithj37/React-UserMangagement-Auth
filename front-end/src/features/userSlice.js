import { createSlice } from "@reduxjs/toolkit";


const initialState={
    user:null,
    status:false,
    isLoading:false,
    error:null
}

 


const userSlice=createSlice({
   name:'user',
   initialState,
   reducers:{
      setUser:(state,action)=>{
        state.user=action.payload.user
        state.status=true
      },
      logoutUser:(state)=>{
        state.user=null
        state.status=false 
      }
       
   }
})

export default userSlice.reducer
export const {setUser,logoutUser}=userSlice.actions