const PersonForm = ({handleNameChange, handleNumberChange, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input
                id='nameInput'
                onChange={handleNameChange}
            />
            </div>
            <div>
            number: <input
                id='numberInput'
                onChange={handleNumberChange}
            />
            </div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm; 