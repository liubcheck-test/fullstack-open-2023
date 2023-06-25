import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    try {
      const response = await blogService.update(blog.id.toString(), updatedBlog)
      setLikes(response.likes)
    } catch (error) {
      // Handle error if the request fails
      console.error(error)
    }
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title}</span> <span>{blog.author}</span>
      <button type="button" onClick={() => setVisible(true)} style={{ display: visible ? 'none' : '' }}>
        view
      </button>
      {visible && (
        <div className="test">
          <button type="button" onClick={() => setVisible(false)}>
            hide
          </button>
          <div>{blog.url}</div>
          <div>
            likes <span>{likes}</span>
            <button type="button" onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <button
            type="button"
            style={{
              display: JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username === blog.user.username ? '' : 'none',
            }}
            onClick={() => handleDelete(blog.id)}
          >
            remove
          </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
