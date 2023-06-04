import Weather from "./Weather"

const Country = ({ country }) => {
    const { name, capital, area, languages, flags } = country
    return (
      <div>
        <h1>{name.common}</h1>
        <br />
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <br />
        <h3>Languages:</h3>
        <ul>
          {Object.entries(languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={flags.png} alt="Flag" />
        <Weather capital={capital} />
      </div>
    )
}

export default Country