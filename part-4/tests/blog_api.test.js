const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

let token

beforeAll(async () => {
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('test_password', 10)
  const user = new User({ username: 'test_user', passwordHash })

  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'test_user', password: 'test_password' })

  token = loginResponse.body.token

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('returns the correct amount of blog posts in JSON format', async () => {
  const response = await api.get('/api/blogs')
  expect(response.status).toBe(200)
  expect(response.header['content-type']).toMatch(/application\/json/)
  expect(response.body).toHaveLength(6)
})

test('blog posts have a unique identifier property named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('creates a new blog post', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com/test-blog',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(7)

  const titles = response.body.map((blog) => blog.title)
  expect(titles).toContain('Test Blog')
})

test('creates a new blog post with default likes', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com/test-blog',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('responds with 400 Bad Request if title is missing', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'https://example.com/test-blog',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('responds with 400 Bad Request if url is missing', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deletes a blog post', async () => {
  const initialBlogs = await helper.blogsInDb()
  const blogToDelete = initialBlogs[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAfterDeletion = await helper.blogsInDb()
  expect(blogsAfterDeletion).toHaveLength(initialBlogs.length - 1)

  const ids = blogsAfterDeletion.map((blog) => blog.id)
  expect(ids).not.toContain(blogToDelete.id)
})

test('updates a blog post', async () => {
  const initialBlogs = await helper.blogsInDb()
  const blogToUpdate = initialBlogs[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(updatedBlog.likes)

  const blogsAfterUpdate = await helper.blogsInDb()
  const updatedBlogInDb = blogsAfterUpdate.find((blog) => blog.id === blogToUpdate.id)
  expect(updatedBlogInDb.likes).toBe(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
