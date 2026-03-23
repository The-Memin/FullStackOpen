import patientsData from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatientData } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (newPatinet: NewPatient): Patient => {
    const newPatientAdded = {
        id: uuid(),
        ...newPatinet
    };
    patients.push(newPatientAdded);
    return(newPatientAdded);
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};