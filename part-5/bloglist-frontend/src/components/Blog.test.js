import React from 'react'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders title and author, but does not render URL or likes by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://test.com',
      likes: 10,
      user: { name: 'Test User' },
    }

    const component = render(<Blog blog={blog} handleDelete={() => {}} />)

    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('John Doe')
    expect(component.container).not.toHaveTextContent('http://test.com')
    expect(component.container).not.toHaveTextContent('10')
  })

  test('renders URL and likes when the "view" button is clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://test.com',
      likes: 10,
      user: { name: 'Test User' },
    }
  
    const component = render(<Blog blog={blog} handleDelete={() => {}} />)
  
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
  
    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('John Doe')
    expect(component.container).toHaveTextContent('http://test.com')
    expect(component.container).toHaveTextContent('10')
  })

  test('calls the event handler twice when the "like" button is clicked twice', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://test.com',
      likes: 10,
      user: { name: 'Test User' },
    }
  
    const mockHandleLike = jest.fn()
  
    const component = render(<Blog blog={blog} handleDelete={() => {}} handleLike={mockHandleLike} />)
  
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
  
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
  
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })

  test('calls the event handler with the right details when the new blog form is submitted', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://test.com',
    }
  
    const mockCreateBlog = jest.fn()
  
    const component = render(<BlogForm createBlog={mockCreateBlog} />)
  
    const titleInput = component.getByLabelText('Title')
    const authorInput = component.getByLabelText('Author')
    const urlInput = component.getByLabelText('URL')
    const form = component.container.querySelector('form')
  
    fireEvent.change(titleInput, { target: { value: blog.title } })
    fireEvent.change(authorInput, { target: { value: blog.author } })
    fireEvent.change(urlInput, { target: { value: blog.url } })
    fireEvent.submit(form)
  
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual(blog)
  })
})