import { useEffect, useState } from "react"
import weather from "../services/weather"

const useWeather = (location)=>{
    const [currentWeather, setCurrentWeather] = useState(null)

    useEffect(()=>{
        if (!location) return
        weather.getWeather(location)
                .then(cW => setCurrentWeather(cW))
                .catch((err) => {
                    console.error("Error fetching weather data:", err);
                    setCurrentWeather(null);
                });
    },[location])

    if (!currentWeather) {
        return {
        temperature: "N/A",
        windSpeed: "N/A",
        weatherIcon: "N/A"
        };
    }
    const urlWeatherIcon = `https://openweathermap.org/img/wn/${currentWeather.weather?.[0]?.icon}@2x.png`;
    return {
        temperature: currentWeather.main?.temp,
        windSpeed: currentWeather.wind?.speed,
        urlWeatherIcon: urlWeatherIcon
    };
}

export default useWeather