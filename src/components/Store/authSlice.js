import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  Allusers: [],
  currentUser: null,
  onlineusers:[]
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    allusers: (state, action) => {
      state.Allusers = action.payload;
    },
    addToAlusers: (state, action) => {
      const { Updateduser } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      const userIndex = newState.Allusers.findIndex((user) => user._id === Updateduser._id);
      if (userIndex !== -1) {
        newState.Allusers[userIndex] = Updateduser
      }
      return newState;
    },
    addnewUser:(state,action)=>{
      const alluserdata=[...state.Allusers,action.payload]
      state.Allusers=alluserdata;

    },
    addonlineUsers:(state,action)=>{
      state.onlineusers=action.payload;

    }
  },

});


export const selecteUsers = (state) => state.auth.Allusers;
export const selecteCurrentUser = (state) => state.auth.currentUser;
export const selecteOnlineUser = (state) => state.auth.onlineusers;

export const { login, logout, allusers,addToAlusers,updateUser,addnewUser,addonlineUsers } = authSlice.actions;

export default authSlice.reducer;


