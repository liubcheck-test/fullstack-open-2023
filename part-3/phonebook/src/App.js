import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonsList from './PersonsList';
import PersonService from './PersonService';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    PersonService.getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      })
  }, [])

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        PersonService.update(existingPerson.id, updatedPerson)
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? data : person
              )
            )
            setNewName('')
            setNewNumber('')
            showNotification(`${newName}'s number has been updated`, 'success')
          })
          .catch((error) => {
            const errorMessage = error.response.data.error;
            showNotification(errorMessage, 'error');
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      PersonService.create(personObject)
        .then((data) => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          showNotification(`${newName} has been added to the phonebook`, 'success')
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          showNotification(errorMessage, 'error');
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          showNotification(`${person.name} has been deleted from the phonebook`, 'success')
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          showNotification(errorMessage, 'error');
        })
    }
  }

  const handleFilterValue = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    const value = event.target.value
    setNewName(value)
  }

  const handleNumberChange = (event) => {
    const value = event.target.value
    setNewNumber(value)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Filter handleFilterValue={handleFilterValue} />
      <h3>Add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <PersonsList shownPersons={shownPersons} deletePerson={deletePerson} />
      {console.log(shownPersons)}
    </div>
  );
};

export default App;