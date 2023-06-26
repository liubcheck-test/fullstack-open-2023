import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
