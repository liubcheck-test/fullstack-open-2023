const Filter = ({ value, onChange }) => {
    return (
      <div>
        <h1>Search for a country</h1>
        <input value={value} onChange={onChange} />
      </div>
    )
}

export default Filter