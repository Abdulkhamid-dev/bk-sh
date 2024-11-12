import { TUser } from '@/type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: {userInfo: TUser} = {
  userInfo: {
  email: '',
  id: 0,
  key: '',
  name: '',
  secret: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.userInfo = action.payload
    },
    removeUser: (state) => {
      state.userInfo = initialState.userInfo;
    },
  },
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer