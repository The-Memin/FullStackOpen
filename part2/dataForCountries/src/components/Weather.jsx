import useWeather from "../hooks/useWeather"
const Weather = ({location})=>{
    const {
        temperature,
        windSpeed,
        urlWeatherIcon
    } = useWeather(location)
    
    return(
        <div>
            <h2>Weather in {location}</h2>
            <p>Temperature: {temperature}</p>
            <img src={urlWeatherIcon} alt={`weather-icon-${location}`} />
            <p>Wind: {windSpeed} m/s</p>
        </div>
    )
}

export default Weather