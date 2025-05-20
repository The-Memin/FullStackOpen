import axios from "axios"

const urlAll = "https://studies.cs.helsinki.fi/restcountries/api/all"
const urlByName = "https://studies.cs.helsinki.fi/restcountries/api/name/"
const getAll = () => {
    return axios.get(urlAll)
        .then( response => response.data)
}

export default {
    getAll
}