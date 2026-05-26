import patientsData from '../../data/patients-full';
import { Patient, NewPatient, NonSensitivePatientData, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const newPatientAdded = {
        id: uuid(),
        ...newPatient
    };
    patients.push(newPatientAdded);
    return(newPatientAdded);
};

const addPatientEntry = ( patientId: string, newEntry: NewEntry ): Entry => {
    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        throw new Error(`Patient ${patientId} not found`);
    }

    const addedEntry: Entry = {
        ...newEntry,
        id: uuid()
    };

    patient.entries = patient.entries.concat(addedEntry);

    return addedEntry;
};

export default {
    getPatients,
    getNonSensitivePatients,
    getPatientById,
    addPatient,
    addPatientEntry
};