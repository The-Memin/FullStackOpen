import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils/toNewPatient';
import { toNewEntry } from '../utils/toNewEntry';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    }catch(error: unknown){
        let errorMessage = 'Something went wrong ';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

router.post('/:id/entries', (req, res) => {
    const patientId = req.params.id;
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(patientId ,newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;