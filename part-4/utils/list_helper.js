const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  const totalSum = likesArray.reduce((sum, likes) => sum + likes, 0)
  return totalSum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  const favorite = blogs.find((blog) => blog.likes === maxLikes)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsNumber = blogs.reduce((number, blog) => {
    number[blog.author] = (number[blog.author] || 0) + 1
    return number
  }, {})

  const maxBlogs = Math.max(...Object.values(blogsNumber))
  const topAuthor = Object.keys(blogsNumber).find(
    (author) => blogsNumber[author] === maxBlogs
  )

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = blogs.reduce((number, blog) => {
    number[blog.author] = (number[blog.author] || 0) + blog.likes
    return number
  }, {})

  const maxLikes = Math.max(...Object.values(likesByAuthor))
  const topAuthor = Object.keys(likesByAuthor).find(
    (author) => likesByAuthor[author] === maxLikes
  )

  return {
    author: topAuthor,
    likes: maxLikes
  }
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}