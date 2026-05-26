import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props{
    entryId: string,
    onCancel: () => void,
    onSubmit: ( values: EntryFormValues, entryId: string) => void
}

const AddEntryForm = ({ onCancel, onSubmit, entryId }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthcheckRating] = useState<HealthCheckRating>(1);

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        
        onSubmit(
            {
                type: 'HealthCheck',
                description,
                date,
                specialist,
                diagnosisCodes,
                healthCheckRating
            },
            entryId
        );
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <div className="flex flex-col gap-2">
                    
                    <TextField
                        label='Description'
                        fullWidth
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField
                        label='Date'
                        fullWidth
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />
                    <TextField
                        label='Specialist'
                        fullWidth
                        value={specialist}
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                    <TextField
                        label='Healthcheck rating'
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthcheckRating(Number(target.value))}
                    />
                    <TextField
                        label='Diagnosis codes'
                        fullWidth
                        value={diagnosisCodes}
                        onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(item => item.trim()))}
                    />
                </div>
                <div className="flex justify-between mt-10">
                    <Button
                        color="error"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={onCancel}
                        >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddEntryForm;