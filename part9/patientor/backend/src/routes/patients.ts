import express from 'express';
import patientService from '../services/patientService';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    try{
        const addedPatient = patientService.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        });
        res.json(addedPatient);
    }catch(error: unknown){
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;