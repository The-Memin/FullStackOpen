import Country from './components/Country'
import useFilterCountries from './hooks/useFilterCountries'
import useCountries from './hooks/useCountries'
function App() {
  const {countries} = useCountries()
  const {textFilter, countriesToShow, handleFilterChange} = useFilterCountries(countries)
  
  const renderCountries = () => {
    if (countriesToShow.length >= 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} showAll={true} />;
    }

    return countriesToShow.map((country) => (
      <Country key={country.name.official} country={country} showAll={false} />
    ));
  };

  return (
   <div>
    <label htmlFor="countryFilter">Find countries:</label>
    <input
      id="countryFilter"
      type="text"
      value={textFilter}
      onChange={handleFilterChange}
    />
    <div>{renderCountries()}</div>
  </div>
  )
}

export default App