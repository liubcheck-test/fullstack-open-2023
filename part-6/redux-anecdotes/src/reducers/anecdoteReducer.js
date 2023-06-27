import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map((anecdote) => asObject(anecdote))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    create: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (content) => {
        return { payload: { content, id: getId(), votes: 0 } }
      },
    },
  },
})

export const createAnecdote = (content) => {
  return async (dispatch) => {
    dispatch(anecdoteSlice.actions.create(content))
    dispatch(setNotification(`New anecdote: "${content}"`, 5))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((a) => a.id === id)
    dispatch(anecdoteSlice.actions.vote(id))
    dispatch(setNotification(`You voted for: "${anecdote.content}"`, 5))
  }
}

export default anecdoteSlice.reducer
