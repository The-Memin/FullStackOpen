import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientsService from "../services/patients";
import { Patient } from "../types";

const PatientDetails = () => {
    const { id } = useParams();

    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientsService.getById(id);
            setPatient(patient);
        };

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
                                    <div className="flex gap-3">
                                        <span>{entry.date}</span>
                                        <p className="italic">{entry.description}</p>
                                    </div>
                                    <ul className="list-disc ml-6 mt-2">
                                        {
                                            entry.diagnosisCodes?.map( code => (
                                                <li key={code} className="text-sm text-gray-900">{code}</li>
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