import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
  },
})

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message))
    setTimeout(() => {
      dispatch(notificationSlice.actions.setNotification(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
