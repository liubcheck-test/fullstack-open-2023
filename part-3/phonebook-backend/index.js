const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('req-body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
)
app.use(cors())

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    const numberOfEntries = persons.length;
    const currentTime = new Date();
    const infoHtml = `
      <div>
        <p>Phonebook has info for ${numberOfEntries} people</p>
        <p>${currentTime}</p>
      </div>
    `;
    response.send(infoHtml);
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
      return response.status(400).json({
            error: 'name or number missing',
      })
    }
    const duplicatePerson = persons.some((person) => person.name === body.name)
    if (duplicatePerson) {
        return response.status(400).json({
            error: 'name must be unique',
        })
    }
    const person = {
      id: Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
      name: body.name,
      number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })