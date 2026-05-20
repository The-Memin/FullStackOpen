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
                <p><span className="font-semibold">ssn:</span> {patient?.ssn}</p>
                <p><span className="font-semibold">date of birth:</span> {patient?.dateOfBirth}</p>
                <p><span className="font-semibold">occupation:</span> {patient?.occupation}</p>
            </div>
        </div>
    );
};

export default PatientDetails;