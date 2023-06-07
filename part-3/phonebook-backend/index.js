require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const Person = require('./models/person')

morgan.token('req-body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
)
app.use(cors())
app.use(express.static('build'))
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person
  .findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

app.get('/info', (request, response) => {
  Person
  .countDocuments()
  .then(count => {
    const currentTime = new Date()
    const infoHtml = `
      <div>
        <p>Phonebook has info for ${count} people</p>
        <p>${currentTime}</p>
      </div>
    `
    response.send(infoHtml)
  })
  .catch(error => {
    console.log(error)
    response.status(404).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})