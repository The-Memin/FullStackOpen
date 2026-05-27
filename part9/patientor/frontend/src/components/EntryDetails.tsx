import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import { Favorite } from "@mui/icons-material";
import { healthCheckColors } from "../types";

const HealthCheckEntryData = ({ entry } : { entry: HealthCheckEntry })   => {
    return(
        <div>
            <p className="flex gap-2 mb-2">{entry.date} <MedicalServicesIcon/></p>
            <p>{entry.description}</p>
            <Favorite 
                sx={{
                    color: healthCheckColors[entry.healthCheckRating]
                }}
            />
            <p className="mt-2">diagnose by {entry.specialist}</p>
        </div>
    );
};

const HospitalEntryData = ({ entry } : { entry: HospitalEntry }) => {
    return(
        <div>
            <p className="flex gap-2 mb-2">{entry.date} <LocalHospitalIcon/></p>
            <p>{entry.description}</p>
            <div>
                {
                    entry.discharge &&
                    <div className="mt-4">
                        <span>Discharge:</span>
                        <p>{entry.discharge.date}  {entry.discharge.criteria}</p>
                    </div>
                }
            </div>
            <p className="mt-2">diagnose by {entry.specialist}</p>
        </div>
    );
};

const OccupationalHealthcareEntryData = ({ entry } : { entry: OccupationalHealthcareEntry }) => {
    return(
        <div>
            <p className="flex gap-2 mb-2">{entry.date} <WorkIcon/></p>
            <p>{entry.description}</p>
            <p className="mt-2">diagnose by {entry.specialist}</p>
        </div>
    );
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    
    switch (entry.type) {
        case "Hospital":
                return <HospitalEntryData entry={entry}/>;
            
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntryData entry={entry}/>;
                
            case "HealthCheck":
                return <HealthCheckEntryData entry={entry}/>;

        default:
            return assertNever(entry);
    }
};

export default EntryDetails;