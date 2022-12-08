import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDark:false
}

const slice = createSlice({
    name: 'darkmode',
    initialState,
    reducers: {
      change: (state, action) => {
        state.isDark = action.payload;
      },
      toDark: (state, action) => {
        state.isDark = true;
      },
      toLight: (state, action)=> {
        state.isDark = false;
      },
      toggle: (state, action) => {
        state.isDark = !state.isDark;
      }
    },
  })

export default slice;
export const {change} = slice.actions;