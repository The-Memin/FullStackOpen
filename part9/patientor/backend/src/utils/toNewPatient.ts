import { NewPatient, Gender, EntryType } from '../types';

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            ssn: parseString(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            occupation: parseString(object.occupation),
            gender: parseGender(object.gender),
            entries: parseEntries(object.entries),
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

const parseEntries = (entries: unknown): NewPatient['entries'] => {
    if (!entries || !Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    const entry = entries as NewPatient['entries'];

    if (!entry.every(e => isEntryType(e.type))) {
        throw new Error('Incorrect entry type: ' + entry);
    }

    return entries as NewPatient['entries'];
};

const isEntryType = (type: unknown): type is EntryType => {
    return Object.values(EntryType).map( e => e.toString()).includes(type as string);
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
