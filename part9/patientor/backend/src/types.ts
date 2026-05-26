export interface Diagnose {
    code: string,
    name: string,
    latin?: string
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

export interface BaseEntry {
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare'
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital,
    discharge: {
        date: string,
        criteria: string
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare,
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
     }
}

export type Entry = | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

//Define omit especial para uniones
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
//Define Entry sin la propiedad id
export type NewEntry = UnionOmit<Entry, 'id'>

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatientData = Omit<Patient, 'ssn'>;