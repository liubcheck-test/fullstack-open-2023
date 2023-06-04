import Person from "./Person";

const PersonsList = ({ shownPersons, deletePerson }) => {
  return (
    <ul>
      {shownPersons.map(person => (
        <li key={person.id}>
          <Person key={person.id} name={person.name} number={person.number} />
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
};

export default PersonsList; 