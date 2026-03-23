import { NewPatient, Gender } from '../types';

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            ssn: parseString(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            occupation: parseString(object.occupation),
            gender: parseGender(object.gender)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown):string => {
    if (!isString(text)) {
        throw new Error('Incorrect or missing string: '+ text);
    }
    return text;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender '+ gender);
    }
    return gender;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map( g => g.toString()).includes(param);
};


const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
