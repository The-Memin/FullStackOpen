const Country = ({country, showAll})=>{
    const countryName = country.name.common

    if(!showAll) return <li>{countryName}</li>
    
    const languages = country.languages 
                    ? Object.values(country.languages) 
                    : [];
    console.log(languages);
    
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
                </div>
            )
}

export default Country