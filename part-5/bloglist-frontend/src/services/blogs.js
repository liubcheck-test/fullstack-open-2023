import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = 'api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject, username) => {
  const config = {
    headers: { Authorization: token },
  }
  const users = await axios.get(userUrl)
  blogObject.user = users.data.find(obj => obj.username === username)._id
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

export default { getAll, setToken, create, update, deleteBlog }