const express = require('express')
const Blog = require('../models/blog')

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title or URL is missing' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  const updatedBlog = {
    title,
    author,
    url,
    likes
  }

  const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  response.json(result)
})

module.exports = blogRouter
