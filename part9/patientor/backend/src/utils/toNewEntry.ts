import { NewEntry, EntryType, HealthCheckRating, Diagnose } from '../types';

export const toNewEntry = ( object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        const baseEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object)
        };

        switch (object.type) {
        case EntryType.Hospital:
            if ('discharge' in object) {
                return {
                    type: EntryType.Hospital,
                    discharge: parseDischarge(object.discharge),
                    ...baseEntry
                };
            }else{
                throw new Error('Incorrect data: some fields are missing (discharge)');
            }

        case EntryType.HealthCheck:
            if ('healthCheckRating' in object) {
                return {
                    type: EntryType.HealthCheck,
                    healthCheckRating: parseHealtCheckRating(object.healthCheckRating),
                    ...baseEntry
                };
            }else{
                throw new Error('Incorrect data: some fields are missing (healthCheckRating)');
            }

        case EntryType.OccupationalHealthcare:
            if ('employerName' in object ) {
                return {
                    type: EntryType.OccupationalHealthcare,
                    employerName: parseString(object.employerName),
                    sickLeave: parseSickLeave(object),
                    ...baseEntry
                };
            }else{
                throw new Error('Incorrect data: some fields are missing in OccupationalHealthcare');
            }

        default:
            throw new Error('Invalid entry type');
        }

    }
    throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseString = (param: unknown): string => {
    if (!isString(param)) {
        throw new Error('Incorrect or missing param: '+ param);
    }

    return param;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseDischarge = (discharge: unknown) => {
    if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
        throw new Error('Incorrect or missing data en discharge');
    }

    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria)
    };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
        return [] as Array<Diagnose['code']>;
    }

    return object.diagnosisCodes as Array<Diagnose['code']>;
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealtCheckRating = (rating: unknown): number => {
    const ratingNumber = Number(rating);
    if(!isNumber(ratingNumber) || !isHealthCheckRating(ratingNumber) ){
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }

    return ratingNumber;
};


const parseSickLeave = (object: unknown) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing sickLeave: ' + object);
    }

    if (!('sickLeave' in object)) {
        return{
            startDate: '',
            endDate: ''
        };
    }
    return parseSickLeaveParams(object.sickLeave);
};

const parseSickLeaveParams = (object: unknown) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing sickLeave: ' + object);
    }

    const startDate = ('startDate' in object) ? object.startDate : '';
    const endDate = ('endDate' in object) ? object.endDate : '';

    return{
        startDate: parseDate(startDate),
        endDate: parseDate(endDate)
    };
};