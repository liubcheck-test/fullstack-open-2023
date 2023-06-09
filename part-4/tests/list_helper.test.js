const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        id: '5a422aa71b54a676234d17f8'
      }
    ]
  
    const listWithMultipleBlogs = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            id: '5a422aa71b54a676234d17f8'
        },
        {
            title: 'Hellow World!',
            author: 'Liubomyr Stepanenko',
            url: 'http://www.liubomyr.com',
            likes: 45, 
            id: '648313f336e8345dc37b5a56'
          },
          {
            title: 'New Book',
            author: 'Peter Newman',
            url: 'http://www.itspeternewman.org',
            likes: 28, 
            id: '300913f336e8345dc37b5a56'
          },
          {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            id: '5a422a851b54a676234d17f7'
          }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })

    test('multiple blogs - equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(85)
    })

    test('zero blogs - equals the likes of that', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          id: '5a422aa71b54a676234d17f8'
        }
    ]
    
    const listWithMultipleBlogs = [
          {
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              id: '5a422aa71b54a676234d17f8'
          },
          {
              title: 'Hellow World!',
              author: 'Liubomyr Stepanenko',
              url: 'http://www.liubomyr.com',
              likes: 45, 
              id: '648313f336e8345dc37b5a56'
            },
            {
              title: 'New Book',
              author: 'Peter Newman',
              url: 'http://www.itspeternewman.org',
              likes: 28, 
              id: '300913f336e8345dc37b5a56'
            },
            {
              title: 'React patterns',
              author: 'Michael Chan',
              url: 'https://reactpatterns.com/',
              likes: 7,
              id: '5a422a851b54a676234d17f7'
            }
    ]
  
    test('when list has only one blog, returns the blog itself', () => {
      expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      })
    })
  
    test('multiple blogs - returns the blog with the most likes', () => {
      expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual({
        title: 'Hellow World!',
        author: 'Liubomyr Stepanenko',
        likes: 45,
      })
    })

    test('zero blogs - returns null', () => {
        expect(listHelper.favoriteBlog([])).toBeNull()
    })
})

describe('most blogs', () => {
    const listWithOneBlog = [
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          id: '5a422aa71b54a676234d17f8'
        }
    ]
    
    const listWithMultipleBlogs = [
        {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            id: "5a422a851b54a676234d17f7"
          },
          {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            id: "5a422aa71b54a676234d17f8"
          },
          {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            id: "5a422b3a1b54a676234d17f9"
          },
          {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            id: "5a422b891b54a676234d17fa"
          },
          {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            id: "5a422ba71b54a676234d17fb"
          },
          {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            id: "5a422bc61b54a676234d17fc"
          }  
    ]

    test('when list has only one blog, returns the blog itself', () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({ 
            author: 'Edsger W. Dijkstra',
            blogs: 1 
        })
    })
  
    test('multiple blogs - returns author with the most blogs', () => {
        expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual({ 
            author: 'Robert C. Martin', 
            blogs: 3 
        })
    })
  
    test('zero blogs - returns null', () => { 
      expect(listHelper.mostBlogs([])).toBeNull()
    })
})

describe('most likes', () => {
    const listWithOneBlog = [
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          id: '5a422aa71b54a676234d17f8'
        }
    ]
    
    const listWithMultipleBlogs = [
        {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            id: "5a422a851b54a676234d17f7"
          },
          {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            id: "5a422aa71b54a676234d17f8"
          },
          {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            id: "5a422b3a1b54a676234d17f9"
          },
          {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            id: "5a422b891b54a676234d17fa"
          },
          {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            id: "5a422ba71b54a676234d17fb"
          },
          {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            id: "5a422bc61b54a676234d17fc"
          }  
    ]

    test('when list has only one blog, returns the blog itself', () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual({ 
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })
  
    test('multiple blogs - returns author with the most likes', () => {
        expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual({ 
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
  
    test('zero blogs - returns null', () => { 
      expect(listHelper.mostLikes([])).toBeNull()
    })
})
  
  