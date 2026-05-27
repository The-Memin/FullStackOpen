import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";
import useModal from "./hooks/useModal";
import usePatient from "./hooks/usePatient";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

const PatientDetails = () => {
    const { id } = useParams();
    const {
        modalOpen,
        error,
        setErrorMessage,
        openModal,
        closeModal
    } = useModal();

    const {
        patient,
        diagnoses,
        entries,
        submitNewEntry
    } = usePatient(id as string, closeModal, setErrorMessage);

    const genderIcon = patient?.gender === 'female' ? <Female /> : patient?.gender === 'male' ? <Male /> : <Transgender />;

    return(
        <div className="mt-10">
            <div>
                <h2 className="text-2xl font-semibold my-4">{patient?.name} {genderIcon}</h2>
                <div>
                    <p><span className="font-semibold">ssn:</span> {patient?.ssn}</p>
                    <p><span className="font-semibold">occupation:</span> {patient?.occupation}</p>
                </div>
                <div className="mt-10">
                    <Button variant="contained" onClick={() => openModal()}>
                        Add new Entry
                    </Button>
                    <AddEntryModal diagnoses={diagnoses} entryId={id as string} modalOpen={ modalOpen } onClose={ closeModal } onSubmit={submitNewEntry} error={error}/>
                </div>
                <div className="mt-8">
                    <h3 className="font-bold text-xl">entries</h3>
                    <div>
                        {
                            entries.map( entry => (
                                <div key={entry.id} className="border border-gray-300 rounded p-4 my-4">
                                    <EntryDetails entry={entry}/>
                                    {
                                        (entry.diagnosisCodes?.length ?? 0) > 0 &&
                                        <div className="mt-4">
                                            <span>Diagnosis Codes:</span>
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
                                    }
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