import { useState} from "react";
import { Weather, Visibility } from "../types";

const useFormEntries = () => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState<Weather | "">("");
    const [visibility, setVisibility] = useState<Visibility | "">("");
    const [comment, setComment] = useState("");

    const setters = {
        setDate,
        setWeather,
        setVisibility,
        setComment
    }

    const values = {
        date,
        weather,
        visibility,
        comment
    }

    const cleanForm = () => {
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
    }

    return {
        setters,
        values,
        cleanForm
    }
      
}

export default useFormEntries;