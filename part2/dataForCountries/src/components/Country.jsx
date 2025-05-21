import { useState } from "react"

const Country = ({country, showAll})=>{
    const countryName = country.name.common
    const [showAllData, setShowAllData] = useState(showAll)

    const toggleShowAllData = ()=>{
        setShowAllData(prev => !prev)
    }

    if(!showAllData) return <li>{countryName} <button onClick={toggleShowAllData}>show</button></li>
    
    const languages = country.languages 
                    ? Object.values(country.languages) 
                    : [];
    
    return (
                <div>
                    <h1>{countryName}</h1>
                    <div>
                        <p>Capital: {country.capital?.[0] ?? 'Unknown'}</p>
                        <p>Area: {country.area ?? 'N/A'}</p>
                    </div>
                    <div>
                        <h3>Languages</h3>
                        <ul>
                            {
                              languages.map(lang=>
                                <li key={lang}>{lang}</li>
                              ) 
                            }
                        </ul>
                    </div>
                    <div>
                        <img src={country.flags.png} alt={`flag-${countryName}`} />
                    </div>
                    <button onClick={toggleShowAllData}>hide</button>
                </div>
            )
}

export default Country