import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const voteResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return voteResponse.data
}

export default { getAll, create, vote }
