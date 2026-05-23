import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types";
import axios from 'axios';

const getAll = async () => {
    const { data } = await axios.get<Diagnose[]>(
        `${apiBaseUrl}/diagnoses`
    );

    return data;
};

export default {
    getAll
};