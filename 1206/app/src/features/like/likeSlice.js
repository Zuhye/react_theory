import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0
}

const slice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
      up: (state, action) => {
        state.count = state.count +1
      },
      reset: (state, action) => {
        state.count = 0
      },
    },
  })

export default slice;
export const {up, reset} = slice.actions;