import { EntryFormValues, Patient, Diagnose, Entry } from "../../types";
import patientsService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useState, useEffect } from "react";
import axios from "axios";

const usePatient = (id: string, closeModal: ()=> void) => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [entryError, setEntryError] = useState<string>();

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientsService.getById(id);
            setPatient(patient);
            setEntries(patient.entries);
        };

        const fetchDiagnoses = async () => {
            const diagnoses = await diagnoseService.getAll();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnoses();
        void fetchPatient();
    }, [id]);

    const submitNewEntry = async (values: EntryFormValues, patientId: string) => {
        try {
            const newEntry = await patientsService.addNewEntry(values, patientId);
            setEntries(entries.concat(newEntry));
            closeModal();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.data && typeof error?.response?.data === "string") {
                    const message = error.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setEntryError(message);
                } else {
                    setEntryError("Unrecognized axios error");
                }
            }else {
                console.error("Unknown error", error);
                setEntryError("Unknown error");
            }
        }
    };

    return{
        patient,
        diagnoses,
        entries,
        submitNewEntry,
        entryError
    };
};


export default usePatient;