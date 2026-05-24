import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientsService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import { Diagnose, Patient } from "../types";
import EntryDetails from "./EntryDetails";


const PatientDetails = () => {
    const { id } = useParams();

    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);


    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientsService.getById(id);
            setPatient(patient);
        };

        const fetchDiagnoses = async () => {
            const diagnoses = await diagnoseService.getAll();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnoses();
        void fetchPatient();
    }, [id]);

    const genderIcon = patient?.gender === 'female' ? <Female /> : patient?.gender === 'male' ? <Male /> : <Transgender />;

    return(
        <div className="mt-10">
            <div>
                <h2 className="text-2xl font-semibold my-4">{patient?.name} {genderIcon}</h2>
                <div>
                    <p><span className="font-semibold">ssn:</span> {patient?.ssn}</p>
                    <p><span className="font-semibold">occupation:</span> {patient?.occupation}</p>
                </div>
                <div className="mt-8">
                    <h3 className="font-bold text-xl">entries</h3>
                    <div>
                        {
                            patient?.entries.map( entry => (
                                <div key={entry.id} className="border border-gray-300 rounded p-4 my-4">
                                    <EntryDetails entry={entry}/>
                                    <ul className="list-disc ml-6 mt-2">
                                        {
                                            entry.diagnosisCodes?.map( code => (
                                                <li key={code} className="text-sm text-gray-900">
                                                    {code} {diagnoses.find(d => d.code === code)?.name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )) 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;