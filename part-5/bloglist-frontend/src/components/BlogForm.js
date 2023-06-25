import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <input
        type="text"
        value={newBlog.title}
        name="title"
        placeholder="Title"
        onChange={handleBlogChange}
      />
      <input
        type="text"
        value={newBlog.author}
        name="author"
        placeholder="Author"
        onChange={handleBlogChange}
      />
      <input
        type="text"
        value={newBlog.url}
        name="url"
        placeholder="URL"
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
