import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const urlBase =  "https://api.openweathermap.org/data/2.5/weather?q="

const getWeather = async (countryName)=>{
    return axios.get(`${urlBase}${countryName}&APPID=${apiKey}`)
            .then(response => response.data)
}

export default {
    getWeather
}