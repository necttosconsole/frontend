import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails:(state,action)=>{
   console.log(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = counterSlice.actions

export default counterSlice.reducer