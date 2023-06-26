describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login to application')
    })

    describe('Login', function() {
        beforeEach(function() {
          cy.request('POST', 'http://localhost:3003/api/testing/reset')
          const user = {
            name: 'Test User',
            username: 'testuser',
            password: 'password123'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.visit('http://localhost:3000')
        })
      
        it('succeeds with correct credentials', function() {
          cy.get('input[name="username"]').type('testuser')
          cy.get('input[name="password"]').type('password123')
          cy.contains('login').click()
          cy.contains('Test User logged in')
        })
      
        it('fails with wrong credentials', function() {
            cy.get('input[name="username"]').type('testuser')
            cy.get('input[name="password"]').type('wrongpassword')
            cy.contains('login').click()
            cy.get('.error')
              .should('contain', 'Wrong username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
          cy.request('POST', 'http://localhost:3003/api/testing/reset')
          const user = {
            name: 'Test User',
            username: 'testuser',
            password: 'password123'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.visit('http://localhost:3000')
          cy.get('input[name="username"]').type('testuser')
          cy.get('input[name="password"]').type('password123')
          cy.contains('login').click()
          cy.contains('Test User logged in')
        })
      
        it('A blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('input[name="title"]').type('Test Blog')
          cy.get('input[name="author"]').type('Test Author')
          cy.get('input[name="url"]').type('https://test-blog.com')
          cy.contains('create').click()
          cy.contains('Test Blog by Test Author')
        })

        it('A blog can be liked', function() {
            cy.contains('new blog').click()
            cy.get('input[name="title"]').type('Test Blog')
            cy.get('input[name="author"]').type('Test Author')
            cy.get('input[name="url"]').type('https://test-blog.com')
            cy.contains('create').click()
            cy.contains('Test Blog by Test Author')
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('Likes: 1')
        })

        it('A blog can be deleted by the user who created it', function() {
            cy.contains('new blog').click()
            cy.get('input[name="title"]').type('Test Blog')
            cy.get('input[name="author"]').type('Test Author')
            cy.get('input[name="url"]').type('https://test-blog.com')
            cy.contains('create').click()
            cy.contains('Test Blog by Test Author')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.contains('Test Blog by Test Author').should('not.exist')
        })

        it("Another user cannot delete someone else's blog", function() {
            cy.contains('logout').click()
          
            const anotherUser = {
              name: 'Another User',
              username: 'anotheruser',
              password: 'password456'
            }
            cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
            cy.visit('http://localhost:3000')
            cy.get('input[name="username"]').type('anotheruser')
            cy.get('input[name="password"]').type('password456')
            cy.contains('login').click()
            cy.contains('Another User logged in')
          
            cy.contains('view').click()
            cy.contains('remove').should('not.exist')
        })

        it('Blogs are ordered by likes', function() {
            cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'https://blog1.com', likes: 3 })
            cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'https://blog2.com', likes: 1 })
            cy.createBlog({ title: 'Blog 3', author: 'Author 3', url: 'https://blog3.com', likes: 2 })
          
            cy.get('.blog')
              .eq(0)
              .should('contain', 'Blog 1 by Author 1')
            cy.get('.blog')
              .eq(1)
              .should('contain', 'Blog 3 by Author 3')
            cy.get('.blog')
              .eq(2)
              .should('contain', 'Blog 2 by Author 2')
        })
    })
})