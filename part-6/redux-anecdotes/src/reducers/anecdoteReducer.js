import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { showNotification } from './notificationReducer'

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initialize',
  async () => {
    const anecdotes = await anecdoteService.getAll()
    return anecdotes
  }
)

export const createAnecdote = createAsyncThunk(
  'anecdotes/create',
  async (content, { dispatch }) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(showNotification(`New anecdote added: ${anecdote.content}`, 5))
    return anecdote
  }
)

export const voteAnecdote = createAsyncThunk(
  'anecdotes/vote',
  async (id, { dispatch }) => {
    const anecdote = await anecdoteService.vote(id)
    dispatch(showNotification(`You voted for anecdote '${anecdote.content}'`, 5))
    return anecdote
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        const { id, votes } = action.payload
        const anecdote = state.find((anecdote) => anecdote.id === id)
        if (anecdote) {
          anecdote.votes = votes
        }
      })
  },
})

export default anecdoteSlice.reducer
