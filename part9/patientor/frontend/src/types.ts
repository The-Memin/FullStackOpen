export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
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

export const healthCheckColors = {
  [HealthCheckRating.Healthy]: '#22c55e',      // verde
  [HealthCheckRating.LowRisk]: '#eab308',      // amarillo
  [HealthCheckRating.HighRisk]: '#f97316',     // naranja
  [HealthCheckRating.CriticalRisk]: '#ef4444', // rojo
};

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck',
    healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: {
        date: string,
        criteria: string
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
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
export type EntryFormValues = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;