export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Entry {
    id: string,
    date: string

}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatientData = Omit<Patient, 'ssn'>;