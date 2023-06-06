const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Usage: node mongo.js <password> [name] [number]')
    process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'

const url = 
    `mongodb+srv://fullstack:${password}@cluster0.hs5muim.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(
        (persons) => {
            console.log('phonebook:')
            persons.forEach((person) => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
         }
    )
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
      name: name,
      number: number,
    })
    person.save().then(() => {
        console.log(`Added ${name} number ${number} to the phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Invalid command. Usage: node mongo.js <password> [name] [number]')
    mongoose.connection.close();
}

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })